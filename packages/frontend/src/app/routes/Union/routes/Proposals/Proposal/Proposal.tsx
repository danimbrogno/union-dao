import {
  ProposalDetailsDocument,
  ProposalDetailsQuery,
  execute,
} from 'packages/frontend/.graphclient';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hexToBigInt } from 'viem';

export const Proposal = () => {
  const params = useParams<'id' | 'proposalId'>();
  const [proposalDetailQuery, setProposalDetailQuery] =
    useState<ProposalDetailsQuery>();

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

  const doVote = useCallback(async (optionId: number) => {
    console.log(optionId);
  }, []);

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
              <button onClick={() => doVote(index)}>Vote!</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};
