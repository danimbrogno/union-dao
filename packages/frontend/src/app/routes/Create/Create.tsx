import { useCallback } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useIPFS } from '../../shared/IPFS';
import { useDropzone } from 'react-dropzone';
import { useIdentity } from '../../shared/Identity';
import Chrome from 'frontend/shared/Chrome/Chrome';
import { useNavigate } from 'react-router-dom';
import { WatchAllUnionsQuery } from 'graphclient';
import { useCreateUnion } from './hooks/useCreateUnion';
import { Inputs } from './Create.interface';
import { Input } from 'ui/Input';
import { Textarea } from 'ui/Textarea';
import { CloseIcon } from 'ui/CloseIcon';
import { PrimaryButton } from 'ui/PrimaryButton';

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

const StyledActiveImage = styled.div`
  display: flex;
  flex: 0;
  margin: auto;
  position: relative;
  flex-direction: column;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: auto;
  }
`;

const StyledClearButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  margin: 0;
  padding: 0;
  background: ${(props) => props.theme.colors.white};
  border: none;
  color: black;
`;

const StyledImage = styled.img``;

const StyledDropzone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 5px;
  border-color: #000;
  border-style: dashed;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>();
  const identity = useIdentity();
  const name = watch('name', '');
  const logo = watch('logo', '');
  const description = watch('description', '');
  const navigate = useNavigate();
  const { ipfs, gatewayUrl } = useIPFS();
  const { onSubmit, error } = useCreateUnion({
    name,
    logo,
    description,
    commitment: identity.getCommitment(),
    onCreated: (data: WatchAllUnionsQuery, createdUnionId?: string) => {
      reset();
      setTimeout(() => navigate(`/union/${createdUnionId}`));
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const buffer = await acceptedFiles[0].arrayBuffer();
      const result = await ipfs.add(buffer);
      await ipfs.pin.add(result.cid);
      setValue('logo', result.cid.toString());
    },
    [ipfs, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClearImage = () => {
    setValue('logo', '');
  };

  let dropzone: React.ReactNode = null;

  if (logo) {
    dropzone = (
      <StyledActiveImage>
        <StyledImage src={gatewayUrl(logo)} alt="logo" />
        <StyledClearButton onClick={handleClearImage}>
          <CloseIcon />
        </StyledClearButton>
      </StyledActiveImage>
    );
  } else {
    if (isDragActive) {
      dropzone = <p>Drop your union logo here</p>;
    } else {
      dropzone = <p>Drop your union logo here</p>;
    }
    dropzone = (
      <StyledDropzone {...getRootProps()}>
        <Input {...getInputProps()} />
        {dropzone}
      </StyledDropzone>
    );
  }

  return (
    <Chrome>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledHeader>Create a Union</StyledHeader>
        <StyledParagraph>
          Start your journey with organized labour by creating a union.
        </StyledParagraph>
        {dropzone}
        <Input
          type="input"
          placeholder="Your Name (e.g. John Smith)"
          {...register('ownerName', { required: true })}
        />
        <Input
          type="input"
          placeholder="Union Name (e.g. International Workers Union)"
          {...register('name', { required: true })}
        />
        <Textarea
          rows={4}
          placeholder="Description (A brief introduction to your organization)"
          {...register('description')}
        />
        <PrimaryButton
          disabled={!isValid || isSubmitting}
          type="submit"
          value="Submit"
        >
          Create
        </PrimaryButton>
        {error && <p>{error.toString()}</p>}
      </StyledForm>
    </Chrome>
  );
};
