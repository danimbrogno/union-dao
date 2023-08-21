import { useConfig } from 'frontend/shared/Config';
import { useIPFS } from 'frontend/shared/IPFS';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { proposalFacetABI } from 'shared';
import { Hex, getAddress, hexToBigInt } from 'viem';
import { useContractWrite } from 'wagmi';

type Inputs = {
  description: string;
  options: Array<{
    description: string;
  }>;
};

export const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      description: 'Sandwhiches are divine.',
      options: [{ description: 'Yay' }, { description: 'Nay' }],
    },
  });

  const {
    addresses: { diamond },
  } = useConfig();

  const params = useParams<'id'>();
  const navigate = useNavigate();

  if (!params.id) {
    throw new Error('Missing ID');
  }

  const unionId = hexToBigInt(params.id as Hex);

  const { fields, append, remove } = useFieldArray<Inputs>({
    control,
    name: 'options',
  });

  const { write, isSuccess, isError, error } = useContractWrite({
    address: getAddress(diamond),
    abi: proposalFacetABI,
    functionName: 'initializeProposal',
    onSettled() {
      reset();
      setTimeout(() => {
        navigate(`/union/${params.id}`);
      });
    },
  });

  const { ipfs } = useIPFS();

  const onSubmit: SubmitHandler<Inputs> = ({ options, description }) => {
    ipfs
      .add(JSON.stringify({ description, options }))
      .then((result) => ipfs.pin.add(result.cid))
      .then((result) =>
        write({
          args: [unionId, options.length, result.toString()],
        })
      );
  };

  const handleAddOption: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    append({ description: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register(`description`)} />
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`options.${index}.description`)} />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddOption}>Add Option</button>
      <input disabled={!isValid || isSubmitting} type="submit" value="Submit" />
      {isSuccess && <p>Success!</p>}
      {isError && <p>{error?.message}</p>}
    </form>
  );
};
