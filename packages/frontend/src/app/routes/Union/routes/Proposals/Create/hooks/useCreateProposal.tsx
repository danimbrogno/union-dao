import { useConfig } from 'frontend/shared/Config';
import { useIPFS } from 'frontend/shared/IPFS';
import { SubmitHandler } from 'react-hook-form';
import { proposalFacetABI } from 'shared';
import { Hex, getAddress, hexToNumber } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Inputs } from '../Create.interface';
import { useCallback } from 'react';
import {
  WatchForProposalCreationDocument,
  WatchForProposalCreationQuery,
  execute,
} from 'graphclient';
import { ExecutionResult } from 'graphql';

export const useCreateProposal = ({
  onCreated,
  unionId,
}: {
  onCreated: (
    result: WatchForProposalCreationQuery,
    createdProposalId: string
  ) => void;
  unionId: string;
}) => {
  const {
    addresses: { diamond },
  } = useConfig();

  const watchUntilBlockHash = useCallback(
    async (blockHash: string, _unionId: Hex, _proposalId: Hex) => {
      const repeater = (await execute(WatchForProposalCreationDocument, {
        id: `${_unionId}.${_proposalId}`,
      })) as AsyncIterable<ExecutionResult<WatchForProposalCreationQuery>>;
      for await (const result of repeater) {
        console.log('watching...');
        if (result.data?._meta?.block.hash === blockHash) {
          console.log('done.');
          onCreated(result.data, hexToNumber(_proposalId).toString());
          break;
        }
      }
    },
    [onCreated]
  );

  const { write, data } = useContractWrite({
    address: getAddress(diamond),
    abi: proposalFacetABI,
    functionName: 'initializeProposal',
  });

  const { error } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      const _unionId = data.logs[data.logs.length - 1]?.topics[1];
      const _proposalId = data.logs[data.logs.length - 1]?.topics[2];
      if (!_unionId || !_proposalId) {
        throw new Error('Could not get proposal id');
      }
      watchUntilBlockHash(data.blockHash, _unionId, _proposalId);
    },
  });

  const { ipfs } = useIPFS();

  const onSubmit: SubmitHandler<Inputs> = ({ title, options, description }) => {
    ipfs
      .add(JSON.stringify({ title, description, options }))
      .then((result) => ipfs.pin.add(result.cid))
      .then((result) =>
        write({
          args: [BigInt(unionId), options.length, result.toString()],
        })
      );
  };

  return { onSubmit, error };
};
