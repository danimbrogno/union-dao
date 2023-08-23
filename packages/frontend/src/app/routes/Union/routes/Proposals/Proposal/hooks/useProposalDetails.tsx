import {
  ProposalDetailsDocument,
  ProposalDetailsQuery,
  execute,
} from 'graphclient';
import { useCallback, useEffect, useState } from 'react';
import { numberToHex, stringToHex } from 'viem';

export const useProposalDetails = ({
  unionId,
  proposalId,
}: {
  unionId: string;
  proposalId: string;
}) => {
  const [proposalDetailQuery, setProposalDetailQuery] =
    useState<ProposalDetailsQuery>();

  const concatenateAndConvertToHex = (num1: string, num2: string) => {
    const a = numberToHex(parseInt(num1), { size: 32 }).substring(2);
    const b = numberToHex(parseInt(num2), { size: 32 }).substring(2);

    // TODO: fix mystery 0s
    const combined = `0x${a}00${b}`;
    return combined;
  };

  const fetchProposalDetail = useCallback(async () => {
    const result = await execute(ProposalDetailsDocument, {
      id: concatenateAndConvertToHex(unionId, proposalId),
    });
    if (result.data) {
      setProposalDetailQuery(result.data);
    }
  }, [unionId, proposalId]);

  useEffect(() => {
    fetchProposalDetail();
  }, [fetchProposalDetail]);

  const proposal = proposalDetailQuery?.proposal;

  return { proposal };
};
