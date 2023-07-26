import styled from '@emotion/styled';
import { Route, Routes, Link } from 'react-router-dom';
import { Config } from './shared/Config';
import { Home } from './routes/Home';
import {
  Chain,
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from '@wagmi/core';
import { Connect } from './components/Connect';
import { Example } from './components/Example';

const localhost: Chain = {
  ...mainnet,
  id: 31337,
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

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
});

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Config>
        <WagmiConfig config={config}>
          <Connect />
          <Example />
          {/* <NxWelcome title="frontend" />

        {/* START: routes */}
          {/* These routes and navigation have been generated for you */}
          {/* Feel free to move and update them to fit your needs */}
          <br />
          <hr />
          <br />
          <div role="navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </WagmiConfig>
      </Config>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
