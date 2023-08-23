import { useConfig } from 'frontend/shared/Config';
import { useIdentity } from 'frontend/shared/Identity';
import useSemaphore from 'frontend/shared/useSemaphoreEthers';
import { useCallback, useEffect, useState } from 'react';
import { proposalFacetABI } from 'shared';
import { Hex, getAddress, hexToBigInt, numberToHex } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { generateProof } from '@semaphore-protocol/proof';
import {
  WatchProposalDetailsDocument,
  WatchProposalDetailsQuery,
  execute,
} from 'graphclient';
import { ExecutionResult } from 'graphql';
export const useVote = ({
  votingContractAddress,
  unionId,
  proposalId,
  onVoted,
}: {
  votingContractAddress: string;
  unionId: string;
  proposalId: string;
  onVoted: (data: WatchProposalDetailsQuery) => void;
}) => {
  const [error, setError] = useState('');

  const identity = useIdentity();

  const watchUntilBlockHash = useCallback(
    async (blockHash: string, _unionId: Hex, _proposalId: Hex) => {
      const repeater = (await execute(WatchProposalDetailsDocument, {
        id: `${numberToHex(parseInt(_unionId), { size: 32 })}.${numberToHex(
          parseInt(_proposalId),
          { size: 32 }
        )}`,
      })) as AsyncIterable<ExecutionResult<WatchProposalDetailsQuery>>;
      for await (const result of repeater) {
        console.log('watching...');
        if (result.data?._meta?.block.hash === blockHash) {
          console.log('done.');
          onVoted(result.data);
          break;
        }
      }
    },
    [onVoted]
  );

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
    confirmations: 1,
    onError: (error) => {
      setError(error.toString());
    },
    onSuccess(data) {
      const _unionId = data.logs[1].topics[1];
      //'0x0000000000000000000000000000000000000000000000000000000000000000'
      const _proposalId = data.logs[1].topics[2];
      //  '0x0000000000000000000000000000000000000000000000000000000000000001'
      if (!_unionId || !_proposalId) {
        throw new Error('Could not get union id or proposal id');
      }

      watchUntilBlockHash(data.blockHash, _unionId, _proposalId);
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
