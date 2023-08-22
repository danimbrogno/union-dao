import { useConfig } from 'frontend/shared/Config';
import { useIdentity } from 'frontend/shared/Identity';
import useSemaphore from 'frontend/shared/useSemaphoreEthers';
import { useCallback, useEffect, useState } from 'react';
import { proposalFacetABI } from 'shared';
import { Hex, getAddress, hexToBigInt } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { generateProof } from '@semaphore-protocol/proof';
export const useVote = ({
  votingContractAddress,
  unionId,
  proposalId,
}: {
  votingContractAddress: string;
  unionId: string;
  proposalId: string;
}) => {
  const [error, setError] = useState('');

  const identity = useIdentity();

  const {
    addresses: { diamond },
  } = useConfig();

  const { write, data } = useContractWrite({
    address: getAddress(diamond),
    abi: proposalFacetABI,
    functionName: 'vote',
    onError: (error) => {
      if (error.toString().indexOf('0x948d0674') !== -1) {
        setError(`Sorry, you can only vote once.`);
      }
      console.log('err', error);
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    onError: (error) => {
      console.log('err', error);
    },
  });

  const { refreshGroup, group } = useSemaphore(votingContractAddress);

  useEffect(() => {
    refreshGroup(proposalId);
  }, [proposalId, refreshGroup]);

  const doVote = useCallback(
    async (optionId: number) => {
      if (!group) {
        throw new Error('group not set');
      }

      generateProof(identity, group, proposalId, BigInt(optionId))
        .then((fullProof) => {
          write({
            args: [
              hexToBigInt(unionId as Hex),
              hexToBigInt(proposalId as Hex),
              BigInt(fullProof.signal),
              BigInt(fullProof.nullifierHash),
              [
                BigInt(fullProof.proof[0]),
                BigInt(fullProof.proof[1]),
                BigInt(fullProof.proof[2]),
                BigInt(fullProof.proof[3]),
                BigInt(fullProof.proof[4]),
                BigInt(fullProof.proof[5]),
                BigInt(fullProof.proof[6]),
                BigInt(fullProof.proof[7]),
              ],
            ],
          });
        })
        .catch((err) => {
          switch (err.toString()) {
            case 'Error: The identity is not part of the group':
              setError('Sorry you are not approved to vote on this proposal.');
              break;
            default:
              setError(err.toString());
              break;
          }
        });
    },
    [identity, unionId, proposalId, write, group]
  );

  return { doVote, isReady: group ? true : false, error };
};
