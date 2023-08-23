import Chrome from 'frontend/shared/Chrome/Chrome';
import styled from '@emotion/styled';
import { useVote } from './hooks/useVote';
import { useProposalDetails } from './hooks/useProposalDetails';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';
import { ProposalMetadata } from 'frontend/app.interface';
import { PrimaryButton } from 'ui/PrimaryButton';
import { ProposalOption } from './components/ProposalOption';
import { useProposalIdParam } from 'frontend/shared/useProposalIdParam';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';
import { Input } from 'ui/Input';
import { useForm } from 'react-hook-form';
import { Inputs } from './Proposal.interface';
import { IconButton } from 'ui/IconButton';
import { useCallback, useState } from 'react';
import { Reader } from './components/Reader';

const StyledForm = styled.form`
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
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Proposal = () => {
  const [scanning, setScanning] = useState(false);
  const unionId = useUnionIdParam();
  const proposalId = useProposalIdParam();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>();
  const { proposal, refetch } = useProposalDetails({
    unionId,
    proposalId,
  });

  const selectedOption = watch('selectedOption');

  const { data: metadata } = useFetchJsonFromCid<ProposalMetadata>(
    proposal?.metadata
  );

  const { onVote, error, isReady } = useVote({
    proposalId,
    unionId,
    votingContractAddress: proposal?.union.votingAddress,
    onVoted: () => {
      reset();
      refetch();
    },
  });

  const hasTitleAndDesc =
    metadata?.title && metadata?.description ? true : false;

  const handleScanRequest = () => {
    setScanning(true);
  };

  const onRead = useCallback(
    (data: string) => {
      setValue('password', data);
    },
    [setValue]
  );

  const disabled =
    !isValid ||
    isSubmitting ||
    isReady === false ||
    selectedOption === undefined;

  const onDismiss = useCallback(() => {
    setScanning(false);
  }, [setScanning]);

  return (
    <Chrome>
      <StyledForm onSubmit={handleSubmit(onVote)}>
        <StyledH1>{metadata?.title || metadata?.description}</StyledH1>
        {hasTitleAndDesc && (
          <ProposalDescription>{metadata?.description}</ProposalDescription>
        )}
        {error && <StyledP>{error}</StyledP>}
        <StyledH2>Voting</StyledH2>
        <StyledUl>
          {(proposal?.options || []).map((option, index) => (
            <ProposalOption
              key={index}
              index={index}
              onClick={(opt) => setValue('selectedOption', opt)}
              option={option}
              metadata={metadata?.options?.[index]}
              selected={selectedOption === index}
            />
          ))}
        </StyledUl>
        <Row>
          <Input
            type="password"
            placeholder="Your Password (Don't forget this!)"
            {...register('password', { required: true })}
          />
          <IconButton onClick={handleScanRequest}>Scan</IconButton>
        </Row>
        <PrimaryButton disabled={disabled} type="submit">
          Vote
        </PrimaryButton>
      </StyledForm>
      {/* <Reader onDismiss={onDismiss} onRead={onRead} /> */}
    </Chrome>
  );
};
