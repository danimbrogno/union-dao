import {
  ProposalDetailsDocument,
  ProposalDetailsQuery,
  execute,
} from 'graphclient';
import { useCallback, useEffect, useState } from 'react';
import { numberToHex } from 'viem';

export const useProposalDetails = ({
  unionId,
  proposalId,
}: {
  unionId: string;
  proposalId: string;
}) => {
  const [proposalDetailQuery, setProposalDetailQuery] =
    useState<ProposalDetailsQuery>();

  const fetchProposalDetail = useCallback(async () => {
    const result = await execute(ProposalDetailsDocument, {
      id: `${numberToHex(parseInt(unionId), { size: 32 })}.${numberToHex(
        parseInt(proposalId),
        { size: 32 }
      )}`,
    });
    if (result.data) {
      setProposalDetailQuery(result.data);
    }
  }, [unionId, proposalId]);

  useEffect(() => {
    fetchProposalDetail();
  }, [fetchProposalDetail]);

  const proposal = proposalDetailQuery?.proposal;

  return { proposal, refetch: fetchProposalDetail };
};
