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
  execute,
  FetchAllUnionsDocument,
  FetchAllUnionsQuery,
  WatchAllUnionsDocument,
  WatchAllUnionsQuery,
} from '../../../.graphclient';
import { ExecutionResult } from 'graphql';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useIPFS } from '../shared/IPFS';

type Inputs = {
  name: string;
};

export const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>();
  const name = watch('name', '');
  const { ipfs } = useIPFS();

  useEffect(() => {
    const func = async () => {
      try {
        const { cid } = await ipfs.add('testing');
        console.log(cid);
      } catch (e) {
        console.log(e);
      }
    };
    func();
  });

  const [allUnionsQuery, setAllUnionsQuery] = useState<FetchAllUnionsQuery>();

  const fetchUnions = useCallback(async () => {
    const result = await execute(FetchAllUnionsDocument, {});
    if (result.data) {
      setAllUnionsQuery(result.data);
    }
  }, []);

  const watchUntilBlockHash = useCallback(
    async (blockHash: string) => {
      const repeater = (await execute(
        WatchAllUnionsDocument,
        {}
      )) as AsyncIterable<ExecutionResult<WatchAllUnionsQuery>>;

      for await (const result of repeater) {
        console.log('watching...');
        if (result.data) {
          setAllUnionsQuery(result.data);
        }
        if (result.data?._meta?.block.hash === blockHash) {
          console.log('done.');
          break;
        }
      }
    },
    [setAllUnionsQuery]
  );

  useEffect(() => {
    fetchUnions();
  }, [fetchUnions]);

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
    onSuccess(data) {
      reset();
      watchUntilBlockHash(data.blockHash);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async () => {
    write?.();
  };

  return (
    <>
      <ul>
        {allUnionsQuery?.unions.map((union) => (
          <li key={union.id}>
            <Link to={`/union/${union.id}`}>
              {union.id}:{union.name}
            </Link>
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
