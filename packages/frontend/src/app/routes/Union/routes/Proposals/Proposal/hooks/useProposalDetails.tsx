import {
  ProposalDetailsDocument,
  ProposalDetailsQuery,
  execute,
} from 'graphclient';
import { useCallback, useEffect, useState } from 'react';

// TODO: should require unionId?
export const useProposalDetails = ({ proposalId }: { proposalId: string }) => {
  const [proposalDetailQuery, setProposalDetailQuery] =
    useState<ProposalDetailsQuery>();

  const fetchProposalDetail = useCallback(async () => {
    const result = await execute(ProposalDetailsDocument, {
      id: proposalId,
    });
    if (result.data) {
      setProposalDetailQuery(result.data);
    }
  }, [proposalId]);

  useEffect(() => {
    fetchProposalDetail();
  }, [fetchProposalDetail]);

  const proposal = proposalDetailQuery?.proposal;

  return { proposal };
};
