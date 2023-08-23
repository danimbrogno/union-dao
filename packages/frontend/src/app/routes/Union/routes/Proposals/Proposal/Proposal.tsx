import Chrome from 'frontend/shared/Chrome/Chrome';
import styled from '@emotion/styled';
import { useVote } from './hooks/useVote';
import { useProposalDetails } from './hooks/useProposalDetails';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';
import { ProposalMetadata } from 'frontend/app.interface';
import { PrimaryButton } from 'ui/PrimaryButton';
import { useState } from 'react';
import { ProposalOption } from './components/ProposalOption';
import { useProposalIdParam } from 'frontend/shared/useProposalIdParam';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';

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
const ProposalDescription = styled.p``;
const StyledH2 = styled.h2``;
const StyledUl = styled.ul``;

const StyledP = styled.p``;

export const Proposal = () => {
  const unionId = useUnionIdParam();
  const proposalId = useProposalIdParam();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const { proposal, refetch } = useProposalDetails({
    unionId,
    proposalId,
  });

  const { data: metadata } = useFetchJsonFromCid<ProposalMetadata>(
    proposal?.metadata
  );

  const { doVote, error, isReady } = useVote({
    proposalId,
    unionId,
    votingContractAddress: proposal?.union.votingAddress,
    onVoted: () => {
      refetch();
    },
  });

  const handleVote = () => {
    if (selectedOption !== null) {
      doVote(selectedOption);
    }
  };

  const hasTitleAndDesc =
    metadata?.title && metadata?.description ? true : false;

  if (proposal) {
    return (
      <Chrome>
        <VotePage>
          <StyledH1>{metadata?.title || metadata?.description}</StyledH1>
          {hasTitleAndDesc && (
            <ProposalDescription>{metadata?.description}</ProposalDescription>
          )}
          {error && <StyledP>{error}</StyledP>}
          <StyledH2>Voting</StyledH2>
          <StyledUl>
            {proposal.options.map((option, index) => (
              <ProposalOption
                key={index}
                index={index}
                onClick={setSelectedOption}
                option={option}
                metadata={metadata?.options?.[index]}
                selected={selectedOption === index}
              />
            ))}
          </StyledUl>
          <PrimaryButton
            disabled={selectedOption === null || isReady === false}
            onClick={handleVote}
          >
            Vote
          </PrimaryButton>
        </VotePage>
      </Chrome>
    );
  }
  return null;
};
