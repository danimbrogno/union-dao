import styled from '@emotion/styled';
import Chrome from 'frontend/shared/Chrome/Chrome';

import { useForm } from 'react-hook-form';
import { Input } from 'ui/Input';
import { PrimaryButton } from 'ui/PrimaryButton';
import { useSubmitApplication } from './hooks/useSubmitApplication';
import { Inputs } from './Join.interface';
import { WatchUnionDetailsQuery } from 'graphclient';
import { useNavigate } from 'react-router-dom';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: auto;
  gap: 1.5rem;
  max-width: 480px;
`;

const StyledHeader = styled.h1`
  text-align: center;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

export const Join = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const { onSubmit, error } = useSubmitApplication({
    onCreated(_: WatchUnionDetailsQuery, _unionId: string) {
      reset();
      setTimeout(() => {
        navigate(`/union/${_unionId}`);
      });
    },
  });

  return (
    <Chrome>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledHeader>Join the Union</StyledHeader>
        <div>
          <label>
            <Input
              placeholder="Your Name"
              {...register('name', { required: true })}
            />
            <Input
              type="password"
              placeholder="Your Password (Don't forget this!)"
              {...register('password', { required: true })}
            />
          </label>
        </div>
        <PrimaryButton disabled={!isValid || isSubmitting} type="submit">
          Submit
        </PrimaryButton>
        {error && <p>{error.toString()}</p>}
      </StyledForm>
    </Chrome>
  );
};
