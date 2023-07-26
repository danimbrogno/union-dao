import LastBroadcast from '../../../../broadcast/AppDeployer.s.sol/31337/run-latest.json';
// TODO: from this variable we should be able to get the contract address of our deployed diamond
console.log(LastBroadcast);

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
