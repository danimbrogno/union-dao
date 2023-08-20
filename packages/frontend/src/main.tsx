import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  Chain,
    WagmiConfig,
    configureChains,
    createConfig,
    mainnet,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from '@wagmi/core';

import App from './app/app';

const localhost: Chain = {
  ...mainnet,
  id: 84531,
  name: 'localhost',
  rpcUrls: {
    public: {
http: ['http://localhost:8545'],
            },
            default: {
http: ['http://localhost:8545'],
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

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
    );
root.render(
    <StrictMode>

    <BrowserRouter>
    <WagmiConfig config={config}>

    <App />
    </WagmiConfig>

    </BrowserRouter>
    </StrictMode>
    );
