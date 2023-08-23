import { useConfig } from 'frontend/shared/Config';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';
import {
  WatchUnionDetailsDocument,
  WatchUnionDetailsQuery,
  execute,
} from 'graphclient';
import { ExecutionResult } from 'graphql';
import { useCallback } from 'react';
import { unionFacetABI } from 'shared';
import { Hex, getAddress, hexToNumber } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

export const useApproveApplication = ({
  admin,
  userId,
  onApproved,
}: {
  admin?: boolean;
  userId: string;
  onApproved: (data: WatchUnionDetailsQuery, unionId: string) => void;
}) => {
  const unionId = useUnionIdParam();

  const {
    addresses: { diamond },
  } = useConfig();

  const watchUntilBlockHash = useCallback(
    async (_blockHash: string, _unionId: Hex) => {
      const repeater = (await execute(WatchUnionDetailsDocument, {
        id: _unionId,
      })) as AsyncIterable<ExecutionResult<WatchUnionDetailsQuery>>;
      for await (const result of repeater) {
        console.log('watching...');
        if (result.data?._meta?.block.hash === _blockHash) {
          console.log('done.');
          onApproved(result.data, hexToNumber(_unionId).toString());
          break;
        }
      }
    },
    [onApproved]
  );

  const { write, data } = useContractWrite({
    abi: unionFacetABI,
    address: getAddress(diamond),
    functionName: 'approveApplication',
  });

  const { error } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      const _unionId = data.logs[data.logs.length - 1].topics[1];
      if (!_unionId) {
        throw new Error('Could not find union id');
      }
      watchUntilBlockHash(data.blockHash, _unionId);
    },
  });

  const onApprove = () => {
    write({
      args: [BigInt(unionId), userId as Hex, admin || false],
    });
  };

  return { onApprove, error };
};
