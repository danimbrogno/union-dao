import styled from '@emotion/styled';
import Chrome from 'frontend/shared/Chrome/Chrome';

import { useForm } from 'react-hook-form';
import { Input } from 'ui/Input';
import { PrimaryButton } from 'ui/PrimaryButton';
import { useSubmitApplication } from './hooks/useSubmitApplication';
import { Inputs } from './Join.interface';
import { WatchUnionDetailsQuery } from 'graphclient';
import { useNavigate } from 'react-router-dom';
import { CardModal } from 'frontend/shared/CardModal';
import { useState } from 'react';

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

const StyledHeader = styled.h1`
  text-align: center;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

export const Join = () => {
  const [showCard, setShowCard] = useState(false);
  const [savedInputs, setSavedInputs] = useState<Inputs>();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>();
  const name = watch('name', '');
  const password = watch('password', '');
  const navigate = useNavigate();
  const { onSubmit, error } = useSubmitApplication({
    onCreated(_: WatchUnionDetailsQuery, _unionId: string) {
      reset();
      setTimeout(() => {
        navigate(`/union/${_unionId}`);
      });
    },
  });

  const interceptSubmit = (input: Inputs) => {
    setSavedInputs(input);
    setShowCard(true);
  };

  const onDownloaded = () => {
    if (savedInputs) {
      onSubmit(savedInputs);
      setTimeout(() => {
        setSavedInputs(undefined);
        setShowCard(false);
      });
    }
  };

  return (
    <Chrome>
      <CardModal
        name={name}
        password={password}
        onDismiss={() => setShowCard(false)}
        onDownloaded={onDownloaded}
        open={showCard}
      />
      <StyledForm onSubmit={handleSubmit(interceptSubmit)}>
        <StyledHeader>Join the Union</StyledHeader>

        <Input
          placeholder="Your Name"
          {...register('name', { required: true })}
        />
        <Input
          type="password"
          placeholder="Your Password (Don't forget this!)"
          {...register('password', { required: true })}
        />
        <PrimaryButton disabled={!isValid || isSubmitting} type="submit">
          Submit
        </PrimaryButton>
        {error && <p>{error.toString()}</p>}
      </StyledForm>
    </Chrome>
  );
};
