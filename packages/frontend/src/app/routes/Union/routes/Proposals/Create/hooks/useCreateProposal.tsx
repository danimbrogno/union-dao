import { useConfig } from 'frontend/shared/Config';
import { useIPFS } from 'frontend/shared/IPFS';
import { SubmitHandler } from 'react-hook-form';
import { proposalFacetABI } from 'shared';
import { getAddress } from 'viem';
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
  unionId: bigint;
}) => {
  const {
    addresses: { diamond },
  } = useConfig();

  const watchUntilBlockHash = useCallback(
    async (blockHash: string, createdProposalId: string) => {
      const repeater = (await execute(WatchForProposalCreationDocument, {
        id: createdProposalId,
      })) as AsyncIterable<ExecutionResult<WatchForProposalCreationQuery>>;
      for await (const result of repeater) {
        console.log('watching...');
        if (result.data?._meta?.block.hash === blockHash) {
          console.log('done.');
          onCreated(result.data, createdProposalId);
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
      const proposalId = data.logs[data.logs.length - 1]?.topics[2];
      if (!proposalId) {
        throw new Error('Could not get proposal id');
      }
      watchUntilBlockHash(data.blockHash, proposalId);
    },
  });

  const { ipfs } = useIPFS();

  const onSubmit: SubmitHandler<Inputs> = ({ title, options, description }) => {
    ipfs
      .add(JSON.stringify({ title, description, options }))
      .then((result) => ipfs.pin.add(result.cid))
      .then((result) =>
        write({
          args: [unionId, options.length, result.toString()],
        })
      );
  };

  return { onSubmit, error };
};
