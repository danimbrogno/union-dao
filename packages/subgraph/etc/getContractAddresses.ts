import fs from 'fs';
import BaseBroadcast from '../../../broadcast/AppDeployer.s.sol/84531/run-latest.json';
import { hexToNumber } from 'viem';

const output = process.argv[2];

function myFunc() {
  const index = BaseBroadcast.transactions.findIndex(
    (tx: any) =>
      tx.contractName === 'Diamond' && tx.transactionType === 'CREATE'
  );

  if (index === -1) {
    throw new Error('Could not find Diamond deploy contract');
  }

  const address = BaseBroadcast.transactions[index].contractAddress;
  const startBlock = hexToNumber(
    BaseBroadcast.receipts[index].blockNumber as `0x{string}`
  );

  fs.writeFileSync(
    output,
    JSON.stringify({
      'base-testnet': {
        UnionFacet: { address, startBlock },
        ProposalFacet: { address, startBlock },
        // IPFSFacet: { address, startBlock },
      },
    })
  );
}

myFunc();
