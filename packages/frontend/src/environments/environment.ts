import LastBroadcast from '../../../../broadcast/AppDeployer.s.sol/84531/run-latest.json';

// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

const txIndex = LastBroadcast.transactions.findIndex(
  (tx) => tx.contractName === 'Diamond' && tx.transactionType === 'CREATE'
);

if (txIndex === -1) {
  throw new Error('Diamond contract not found');
}

const transaction = LastBroadcast.transactions[txIndex];
const receipt = LastBroadcast.receipts[txIndex];

export const environment = {
  production: false,
  appUrl: process.env.NX_FRONTEND_URL || 'http://localhost:4200',
  ethereum: {
    chainId: process.env.ETHEREUM_CHAIN_ID
      ? parseInt(process.env.ETHEREUM_CHAIN_ID)
      : 84531,
    rpcUrl: process.env.ETHEREUM_RPC_URL || 'http://localhost:8545',
    startBlock: parseInt(receipt.blockNumber),
  },
  addresses: {
    diamond: transaction?.contractAddress || '0x0',
  },
  ipfs: {
    nodeAddress: process.env.NX_IPFS_NODE_ADDRESS || 'http://localhost:5001',
    gatewayAddress:
      process.env.NX_IPFS_GATEWAY_ADDRESS || 'http://localhost:8080',
  },
};
