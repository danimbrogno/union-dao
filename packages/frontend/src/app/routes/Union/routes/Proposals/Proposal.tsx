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
  }, [params.id]);

  useEffect(() => {
    fetchProposalDetail();
  }, [fetchProposalDetail]);

  if (proposalDetailQuery?.proposal) {
    return (
      <div>
        <h1>
          {hexToBigInt(proposalDetailQuery.proposal.id).toString()}:{' '}
          {proposalDetailQuery.proposal.metadata?.description}
        </h1>

        <h2>Options</h2>
        <ul>
          {(proposalDetailQuery.proposal.metadata?.options || []).map(
            (option) => (
              <li key={option.id}>
                <p>{option.description}</p>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
  return null;
};
