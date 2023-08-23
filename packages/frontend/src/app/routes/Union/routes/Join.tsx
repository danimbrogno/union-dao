import { useConfig } from 'frontend/shared/Config';
import { useIPFS } from 'frontend/shared/IPFS';
import { useIdentity } from 'frontend/shared/Identity';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { unionFacetABI } from 'shared';
import { Hex, getAddress, hexToBigInt } from 'viem';
import { useContractWrite } from 'wagmi';

type Inputs = {
  name: string;
  imageCID: string;
};

export const Join = () => {
  const params = useParams<'id'>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>();
  if (!params.id) {
    throw new Error('Missing ID');
  }
  const unionId = hexToBigInt(params.id as Hex);
  const identity = useIdentity();
  const { ipfs } = useIPFS();
  const name = watch('name', '');
  const metadataCID = watch('name', '');
  const {
    addresses: { diamond },
  } = useConfig();

  const { write, data, isSuccess, isError, error } = useContractWrite({
    address: getAddress(diamond),
    abi: unionFacetABI,
    functionName: 'submitApplication',
  });

  const onSubmit = () => {
    ipfs
      .add(JSON.stringify({ name }))
      .then((result) => ipfs.pin.add(result.cid))
      .then((result) =>
        write({
          args: [unionId, identity.getCommitment(), result.toString()],
        })
      );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Join the Union</h1>
      <p>
        Name
        <input {...register('name', { required: true })} />
      </p>
      <input disabled={!isValid || isSubmitting} type="submit" value="Submit" />
      {isSuccess && <p>Success!</p>}
      {isError && <p>{error?.message}</p>}
    </form>
  );
};
