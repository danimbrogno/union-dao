import {
  ProposalDetailsDocument,
  ProposalDetailsQuery,
  execute,
} from 'packages/frontend/.graphclient';
import { useConfig } from 'packages/frontend/src/app/shared/Config';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { proposalFacetABI, semaphoreVotingABI } from 'shared';
import { Hex, getAddress, hexToBigInt } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { FullProof, generateProof } from '@semaphore-protocol/proof';
import { Group } from '@semaphore-protocol/group';
import { useIdentity } from 'packages/frontend/src/app/shared/Identity';
import { SemaphoreEthers } from '@semaphore-protocol/data';
import useSemaphore from 'packages/frontend/src/app/shared/useSemaphoreEthers';
import { waitForTransaction } from '@wagmi/core';

export const Proposal = () => {
  const params = useParams<'id' | 'proposalId'>();

  const [proposalDetailQuery, setProposalDetailQuery] =
    useState<ProposalDetailsQuery>();
  const {
    addresses: { diamond },
  } = useConfig();
  const identity = useIdentity();
  const contractAddress = proposalDetailQuery?.proposal?.union.votingAddress;
  const { refreshGroup, group } = useSemaphore(contractAddress);
  const { write, error, data } = useContractWrite({
    address: contractAddress, //getAddress(diamond),
    abi: semaphoreVotingABI, //proposalFacetABI,
    functionName: 'castVote', //'vote',
    onError: (error) => {
      console.log('err', error);
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    onError: (error) => {
      console.log('err', error);
    },
  });

  useEffect(() => {
    const gid = hexToBigInt(params.id as Hex).toString();
    console.log(params.id);
    refreshGroup(params.id as string);
  }, [params.id, refreshGroup]);

  const fetchProposalDetail = useCallback(async () => {
    if (!params.id || !params.proposalId) return;

    const result = await execute(ProposalDetailsDocument, {
      id: params.proposalId,
    });
    if (result.data) {
      setProposalDetailQuery(result.data);
    }
  }, [params.id, params.proposalId]);

  useEffect(() => {
    fetchProposalDetail();
  }, [fetchProposalDetail]);

  const doVote = useCallback(
    async (optionId: number) => {
      const bigVote = BigInt(optionId);
      if (!params.proposalId || !params.id) {
        throw new Error('missing proposal id');
      }

      const unionId = hexToBigInt(params.id as Hex);
      const pollId = hexToBigInt(params.proposalId as Hex);
      // const _users = [identity.commitment];

      if (!group) {
        throw new Error('group not set');
      }
      // group.addMember(identity.commitment);

      generateProof(identity, group, pollId, bigVote).then((fullProof) => {
        write({
          args: [
            // unionId,
            bigVote,
            identity.nullifier,
            pollId,
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
      });
    },
    [identity, params.id, params.proposalId, write, group]
  );

  const proposal = proposalDetailQuery?.proposal;
  if (proposal) {
    const options = Array.from(
      { length: proposal.numOptions },
      (_, index) => index
    );

    return (
      <div>
        <h1>
          {hexToBigInt(proposal.id).toString()}:{' '}
          {proposal.metadata?.description}
        </h1>

        <h2>Options</h2>
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              <p>
                {index}:{' '}
                {proposal.metadata?.options[index].description ||
                  'Loading Option...'}
              </p>
              <button disabled={!group} onClick={() => doVote(index)}>
                Vote!
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};
