import Chrome from 'frontend/shared/Chrome/Chrome';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from 'ui/Input';
import { Textarea } from 'ui/Textarea';
import { Hex, hexToBigInt } from 'viem';
import styled from '@emotion/styled';
import { PrimaryButton } from 'ui/PrimaryButton';
import { RemoveIcon } from 'ui/RemoveIcon';
import { IconButton } from 'ui/IconButton';
import { AddIcon } from 'ui/AddIcon';
import { useCreateProposal } from './hooks/useCreateProposal';
import { Inputs } from './Create.interface';
import { WatchForProposalCreationQuery } from 'graphclient';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: auto;
  max-width: 480px;
  gap: 1.5rem;
`;

const OptionRow = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 480px;
`;

const Option = styled.div`
  flex: 6;
`;

const Remove = styled.div`
  flex: 1;
`;

export const Create = () => {
  const unionId = useUnionIdParam();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      description: '',
      options: [{ description: 'Yay' }, { description: 'Nay' }],
    },
  });

  const { onSubmit } = useCreateProposal({
    unionId,
    onCreated: (_: WatchForProposalCreationQuery, proposalId: string) => {
      reset();
      setTimeout(() => {
        navigate(
          `/union/${unionId}/proposal/${parseInt(proposalId, 16).toString()}`
        );
      });
    },
  });

  const { fields, append, remove } = useFieldArray<Inputs>({
    control,
    name: 'options',
  });

  const handleAddOption: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    append({ description: '' });
  };

  return (
    <Chrome>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h1>Create Proposal</h1>
        <Input
          placeholder="Proposal Title"
          {...register(`title`, { required: true })}
        />
        <Textarea
          placeholder="Proposal Description"
          {...register(`description`, { required: true })}
        />
        {fields.map((field, index) => (
          <OptionRow key={field.id}>
            <Option>
              <Input
                placeholder="Option"
                {...register(`options.${index}.description`, {
                  required: true,
                })}
              />
            </Option>
            <Remove>
              <IconButton onClick={() => remove(index)}>
                <RemoveIcon />
              </IconButton>
            </Remove>
          </OptionRow>
        ))}
        <IconButton
          css={{ width: 120, marginRight: 'auto' }}
          onClick={handleAddOption}
        >
          <AddIcon />
          Add Option
        </IconButton>
        <PrimaryButton disabled={!isValid || isSubmitting} type="submit">
          Submit
        </PrimaryButton>
      </StyledForm>
    </Chrome>
  );
};
