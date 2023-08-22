import styled from '@emotion/styled';
import {
  ProposalMetadata,
  ProposalMetadataOption,
} from 'frontend/app.interface';
import { ProposalOptionDetailFragment } from 'graphclient';
import { SecondaryButton } from 'ui/SecondaryButton';

const OptionRow = styled.li`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid black;
  /* background-color: ${(props) => props.theme.colors.color1}; */
`;
const NumVoteCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const VoteButtonCol = styled.div`
  flex: 0;
`;
const VoteOption = styled.p`
  font-size: 32px;
`;
const StyledVotes = styled.p`
  font-size: 32px;
`;

export const ProposalOption = ({
  index,
  option,
  metadata,
  selected,
  onClick,
}: {
  index: number;
  option: ProposalOptionDetailFragment;
  metadata?: ProposalMetadataOption;
  selected?: boolean;
  onClick: (index: number) => void;
}) => {
  const handleClick = () => onClick(index);
  return (
    <OptionRow>
      <VoteOption>{metadata?.description}</VoteOption>
      <NumVoteCol>
        <StyledVotes>{option.votes}</StyledVotes>
      </NumVoteCol>
      <VoteButtonCol>
        <SecondaryButton disabled={selected} onClick={handleClick}>
          Select
        </SecondaryButton>
      </VoteButtonCol>
    </OptionRow>
  );
};
