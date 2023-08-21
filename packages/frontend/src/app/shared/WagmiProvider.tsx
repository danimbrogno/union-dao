import styled from '@emotion/styled';
import { Route, Routes, Link } from 'react-router-dom';
import { Config } from './Config';
import {
  Chain,
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from '@wagmi/core';
import { PropsWithChildren } from 'react';
import { environment } from '../../environments/environment';

const localhost: Chain = {
  ...mainnet,
  id: 84531,
  name: 'localhost',
  rpcUrls: {
    public: {
      http: [environment.ethereum.rpcUrl],
    },
    default: {
      http: [environment.ethereum.rpcUrl],
    },
  },
};

const { chains, publicClient } = configureChains(
  [localhost],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
});

export const WagmiProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
