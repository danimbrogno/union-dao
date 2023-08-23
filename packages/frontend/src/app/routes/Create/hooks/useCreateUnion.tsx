import { SubmitHandler } from 'react-hook-form';
import { Inputs } from '../Create.interface';
import { useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { getAddress, hexToNumber } from 'viem';
import { unionFacetABI } from 'shared';
import { useConfig } from 'frontend/shared/Config';
import {
  WatchAllUnionsDocument,
  WatchAllUnionsQuery,
  execute,
} from 'graphclient';
import { ExecutionResult } from 'graphql';
import { useIPFS } from 'frontend/shared/IPFS';

export const useCreateUnion = ({
  name,
  logo,
  description,
  commitment,
  onCreated,
}: {
  name: string;
  logo: string;
  description: string;
  commitment: bigint;
  onCreated: (data: WatchAllUnionsQuery, createdUnionId: string) => void;
}) => {
  const {
    addresses: { diamond },
  } = useConfig();

  const { ipfs } = useIPFS();

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

  const { write, data } = useContractWrite({
    address: getAddress(diamond),
    abi: unionFacetABI,
    functionName: 'createUnion',
  });

  const { error } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      const createdUnionId = data.logs[0].topics[1];
      if (!createdUnionId) {
        throw new Error('Created union id not found.');
      }
      watchUntilBlockHash(
        data.blockHash,
        hexToNumber(createdUnionId).toString()
      );
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({
    name,
    description,
    logo,
    ownerName,
  }) => {
    Promise.all([
      ipfs.add(JSON.stringify({ name, description, logo })),
      ipfs.add(JSON.stringify({ name: ownerName })),
    ])
      .then(([unionResult, ownerResult]) =>
        Promise.all([
          ipfs.pin.add(unionResult.cid),
          ipfs.pin.add(ownerResult.cid),
        ])
      )
      .then(([unionResult, ownerResult]) =>
        write?.({
          args: [unionResult.toString(), ownerResult.toString(), commitment],
        })
      );
  };

  return { onSubmit, error };
};
