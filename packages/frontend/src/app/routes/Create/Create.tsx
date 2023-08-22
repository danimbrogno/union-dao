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

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: auto;
`;

const StyledHeader = styled.h1`
  margin: 20px 0;
  text-align: center;
`;
const StyledParagraph = styled.p`
  margin: 20px 0;
  text-align: center;
`;

const StyledActiveImage = styled.div`
  display: flex;
  flex: 0;
  max-width: 320px;
  margin: auto;
  position: relative;
  flex-direction: column;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: auto;
  }
`;

const StyledInput = styled.input`
  margin: 20px 0 10px;
  border-radius: 5px;
  padding: 10px 8px;
  border: 1px solid ${({ theme }) => theme.colors.color3};
  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;
  font-family: 'Arial', 'sans-serif';
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.color5};
  }
`;

const StyledTextarea = styled.textarea`
  margin: 10px 0;
  border-radius: 5px;
  padding: 10px 8px;
  height: 140px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: 'Arial', 'sans-serif';
  border: 1px solid ${({ theme }) => theme.colors.color3};
  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.color5};
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
const StyledButton = styled.button`
  margin: 10px 0;
  padding: 15px 20px;
  flex: 1;
  background-color: ${(props) => props.theme.colors.color1};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.color2};
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.color3};
    cursor: not-allowed;
  }
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
  const imageCID = watch('imageCID', '');
  const description = watch('description', '');
  const navigate = useNavigate();
  const { ipfs, gatewayUrl } = useIPFS();
  const { onSubmit, error } = useCreateUnion({
    name,
    imageCID,
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
      setValue('imageCID', result.cid.toString());
    },
    [ipfs, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClearImage = () => {
    setValue('imageCID', '');
  };

  let dropzone: React.ReactNode = null;

  if (imageCID) {
    dropzone = (
      <StyledActiveImage>
        <StyledImage src={gatewayUrl(imageCID)} alt="logo" />
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
        <StyledInput {...getInputProps()} />
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
        <StyledInput
          type="input"
          placeholder="Name"
          {...register('name', { required: true })}
        />
        <StyledTextarea
          rows={4}
          placeholder="Description"
          {...register('description')}
        />
        <StyledButton
          disabled={!isValid || isSubmitting}
          type="submit"
          value="Submit"
        >
          Create
        </StyledButton>
        {error && <p>{error.toString()}</p>}
      </StyledForm>
    </Chrome>
  );
};
