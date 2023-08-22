import { SubmitHandler } from 'react-hook-form';
import { Inputs } from '../Create.interface';
import { useCallback } from 'react';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { getAddress, stringToHex } from 'viem';
import { unionFacetABI } from 'shared';
import { useConfig } from 'frontend/shared/Config';
import {
  WatchAllUnionsDocument,
  WatchAllUnionsQuery,
  execute,
} from 'graphclient';
import { ExecutionResult } from 'graphql';

export const useCreateUnion = ({
  name,
  imageCID,
  description,
  commitment,
  onCreated,
}: {
  name: string;
  imageCID: string;
  description: string;
  commitment: bigint;
  onCreated: (data: WatchAllUnionsQuery, createdUnionId: string) => void;
}) => {
  const {
    addresses: { diamond },
  } = useConfig();

  const { config } = usePrepareContractWrite({
    address: getAddress(diamond),
    abi: unionFacetABI,
    functionName: 'createUnion',
    args: [stringToHex(name, { size: 32 }), imageCID, description, commitment],
    enabled: name !== '' ? true : false,
  });

  const watchUntilBlockHash = useCallback(
    async (blockHash: string, createdUnionId: string) => {
      const repeater = (await execute(
        WatchAllUnionsDocument,
        {}
      )) as AsyncIterable<ExecutionResult<WatchAllUnionsQuery>>;
      for await (const result of repeater) {
        console.log('watching...');
        if (result.data?._meta?.block.hash === blockHash) {
          console.log('done.');
          onCreated(result.data, createdUnionId);
          break;
        }
      }
    },
    [onCreated]
  );

  const { write, data } = useContractWrite(config);

  const { error } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      const createdUnionId = data.logs[0].topics[1];
      if (!createdUnionId) {
        throw new Error('Created union id not found.');
      }
      watchUntilBlockHash(data.blockHash, createdUnionId);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = () => write?.();

  return { onSubmit, error };
};
