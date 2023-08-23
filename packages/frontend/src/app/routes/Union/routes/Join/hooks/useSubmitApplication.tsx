import { useConfig } from 'frontend/shared/Config';
import { useIPFS } from 'frontend/shared/IPFS';
import { SubmitHandler } from 'react-hook-form';
import { unionFacetABI } from 'shared';
import { Hex, getAddress, hexToNumber } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Inputs } from '../Join.interface';
import { useGetIdentity } from 'frontend/shared/Identity';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';
import { useCallback } from 'react';
import {
  WatchUnionDetailsDocument,
  WatchUnionDetailsQuery,
  execute,
} from 'graphclient';
import { ExecutionResult } from 'graphql';

export const useSubmitApplication = ({
  onCreated,
}: {
  onCreated: (data: WatchUnionDetailsQuery, updatedUnionId: string) => void;
}) => {
  const { ipfs } = useIPFS();
  const {
    addresses: { diamond },
  } = useConfig();

  const getIdentity = useGetIdentity();
  const unionId = useUnionIdParam();

  const watchUntilBlockHash = useCallback(
    async (_blockHash: string, _unionId: Hex) => {
      const repeater = (await execute(WatchUnionDetailsDocument, {
        id: _unionId,
      })) as AsyncIterable<ExecutionResult<WatchUnionDetailsQuery>>;
      for await (const result of repeater) {
        console.log('watching...');
        if (result.data?._meta?.block.hash === _blockHash) {
          console.log('done.');
          onCreated(result.data, hexToNumber(_unionId).toString());
          break;
        }
      }
    },
    [onCreated]
  );

  const { write, data, error } = useContractWrite({
    address: getAddress(diamond),
    abi: unionFacetABI,
    functionName: 'submitApplication',
  });

  useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      const _unionId = data.logs[0].topics[1];
      if (!_unionId) {
        throw new Error('Created union id not found.');
      }
      watchUntilBlockHash(data.blockHash, _unionId);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ name, password }) => {
    ipfs
      .add(JSON.stringify({ name }))
      .then((result) => ipfs.pin.add(result.cid))
      .then((result) =>
        write({
          args: [
            BigInt(unionId),
            getIdentity(password).getCommitment(),
            result.toString(),
          ],
        })
      );
  };

  return { onSubmit, error };
};
