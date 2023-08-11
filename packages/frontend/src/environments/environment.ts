import LastBroadcast from '../../../../broadcast/AppDeployer.s.sol/84531/run-latest.json';

// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  addresses: {
    diamond: LastBroadcast.transactions.find(
      (tx) => tx.contractName === 'Diamond' && tx.transactionType === 'CREATE'
    )?.contractAddress,
  },
};
