import { useParams } from 'react-router-dom';
import Chrome from 'frontend/shared/Chrome/Chrome';
import styled from '@emotion/styled';
import { useVote } from './hooks/useVote';
import { useProposalDetails } from './hooks/useProposalDetails';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';
import { ProposalMetadata } from 'frontend/app.interface';

const VotePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: auto;
  gap: 1.5rem;
  max-width: 480px;
  width: 100%;
`;

const StyledH1 = styled.h1``;
const StyledH2 = styled.h2``;
const StyledUl = styled.ul``;
const StyledLi = styled.li`
  padding: 20px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors.white};
  /* background-color: ${(props) => props.theme.colors.color1}; */
`;
const StyledP = styled.p``;
const StyledVotes = styled.p`
  font-size: 32px;
`;
const StyledButton = styled.button``;

export const Proposal = () => {
  const params = useParams<'id' | 'proposalId'>();

  const { id: unionId, proposalId } = params;

  if (!unionId) {
    throw new Error('Missing unionId');
  }
  if (!proposalId) {
    throw new Error('Missing proposal id');
  }

  const { proposal } = useProposalDetails({
    proposalId,
  });

  const { data: metadata } = useFetchJsonFromCid<ProposalMetadata>(
    proposal?.metadata
  );

  const { doVote, error, isReady } = useVote({
    proposalId,
    unionId,
    votingContractAddress: proposal?.union.votingAddress,
  });

  if (proposal) {
    const options = Array.from(
      { length: proposal.numOptions },
      (_, index) => index
    );

    return (
      <Chrome>
        <VotePage>
          <StyledH1>{metadata?.description}</StyledH1>
          {error && <StyledP>{error}</StyledP>}
          <StyledH2>Options</StyledH2>
          <StyledUl>
            {options.map((option, index) => (
              <StyledLi key={index}>
                <StyledP>
                  {metadata?.options[index]?.description}: Votes:{' '}
                </StyledP>
                <StyledVotes>{proposal.options[index].votes}</StyledVotes>
                <StyledButton disabled={!isReady} onClick={() => doVote(index)}>
                  Vote!
                </StyledButton>
              </StyledLi>
            ))}
          </StyledUl>
        </VotePage>
      </Chrome>
    );
  }
  return null;
};
