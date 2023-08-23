import { useParams } from 'react-router-dom';

export const useProposalIdParam = () => {
  const { proposalId } = useParams<'proposalId'>();

  if (!proposalId) {
    throw new Error('Missing proposal id');
  }
  return proposalId;
};
