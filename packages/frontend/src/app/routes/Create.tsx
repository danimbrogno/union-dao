import { getAddress, stringToHex } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useConfig } from '../shared/Config';
import { unionFacetABI } from 'shared';
import { useCallback, useEffect, useState } from 'react';
import {
  AllUnionsQuery,
  AllUnionsDocument,
  execute,
} from '../../../.graphclient';
import { ExecutionResult } from 'graphql';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
};

export const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Inputs>();
  const name = watch('name', '');

  const [allUnionsQuery, setAllUnionsQuery] = useState<AllUnionsQuery>();

  const getUnions = useCallback(async () => {
    const repeater = (await execute(AllUnionsDocument, {})) as AsyncIterable<
      ExecutionResult<AllUnionsQuery>
    >;

    for await (const result of repeater) {
      if (result.data) {
        setAllUnionsQuery(result.data);
      }
    }
  }, [setAllUnionsQuery]);

  useEffect(() => {
    getUnions();
  }, [getUnions]);

  const {
    addresses: { diamond },
  } = useConfig();

  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: getAddress(diamond),
    abi: unionFacetABI,
    functionName: 'createUnion',
    args: [stringToHex(name, { size: 32 })],
    enabled: name !== '' ? true : false,
  });

  const { write, data } = useContractWrite(config);

  const { isSuccess, isError, error } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
  });

  const onSubmit: SubmitHandler<Inputs> = async () => {
    write?.();
  };

  return (
    <>
      <ul>
        {allUnionsQuery?.unions.map((union) => (
          <li key={union.id}>
            {union.id}:{union.name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="input"
          placeholder="Name"
          {...register('name', { required: true })}
        />
        <input
          disabled={!isValid || isSubmitting}
          type="submit"
          value="Submit"
        />
        {isSuccess && <p>Success!</p>}
        {isPrepareError && <p>{prepareError?.message}</p>}
        {isError && <p>{error?.message}</p>}
      </form>
    </>
  );
};
