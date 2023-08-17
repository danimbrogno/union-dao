import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@semaphore-protocol/hardhat';
import '@typechain/hardhat';
import { config as dotenvConfig } from 'dotenv';
import 'hardhat-gas-reporter';
import { HardhatUserConfig } from 'hardhat/config';
import { NetworksUserConfig } from 'hardhat/types';
import { resolve } from 'path';
import 'solidity-coverage';
import { config } from './config.json';
import './tasks/deploy';
import 'hardhat-dependency-compiler';

dotenvConfig({ path: resolve(__dirname, '../../.env') });

function getNetworks(): NetworksUserConfig {
  const key = process.env.ETHEREUM_PRIVATE_KEY;
  if (!key) {
    throw new Error('missing private key');
  }

  const accounts = [key];

  return {
    localbasegoerli: {
      url: 'http://127.0.0.1:8545',
      chainId: 84531,
      accounts,
      gasPrice: 50000000000,
    },
  };
}

const hardhatConfig: HardhatUserConfig = {
  solidity: config.solidity,
  paths: {
    sources: config.paths.contracts,
    tests: config.paths.tests,
    cache: config.paths.cache,
    artifacts: config.paths.build.contracts,
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ...getNetworks(),
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS === 'true',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  typechain: {
    outDir: config.paths.build.typechain,
    target: 'ethers-v5',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  dependencyCompiler: {
    paths: ['@semaphore-protocol/contracts/extensions/SemaphoreVoting.sol'],
  },
};

export default hardhatConfig;
