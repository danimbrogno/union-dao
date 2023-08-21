import { getAddress, hexToBigInt, stringToHex } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useConfig } from '../../shared/Config';
import { unionFacetABI } from 'shared';
import { useCallback, useEffect, useState } from 'react';
import {
  execute,
  FetchAllUnionsDocument,
  FetchAllUnionsQuery,
  WatchAllUnionsDocument,
  WatchAllUnionsQuery,
} from '../../../../.graphclient';
import { ExecutionResult } from 'graphql';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useIPFS } from '../../shared/IPFS';
import { useDropzone } from 'react-dropzone';
import { useIdentity } from '../../shared/Identity';

type Inputs = {
  name: string;
  imageCID: string;
};

export const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>();
  const identity = useIdentity();
  const name = watch('name', '');
  const imageCID = watch('imageCID', '');
  const description = '';

  const { ipfs, gatewayUrl } = useIPFS();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      console.log('uploading files');
      const buffer = await acceptedFiles[0].arrayBuffer();
      const result = await ipfs.add(buffer);
      await ipfs.pin.add(result.cid);
      setValue('imageCID', result.cid.toString());
    },
    [ipfs, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [allUnionsQuery, setAllUnionsQuery] = useState<FetchAllUnionsQuery>();

  const fetchUnions = useCallback(async () => {
    debugger;
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
    args: [
      stringToHex(name, { size: 32 }),
      imageCID,
      description,
      identity.getCommitment(),
    ],
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
              {hexToBigInt(union.id).toString()}:{union.name}
            </Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{ height: 400, width: '100%', border: '1px solid black' }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {imageCID && (
          <img
            height="400"
            width="auto"
            src={gatewayUrl(imageCID)}
            alt="logo"
          />
        )}
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
