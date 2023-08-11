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
import { Create } from './routes/Create';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Union } from './routes/Union/Union';

const client = new ApolloClient({
  uri: 'http://localhost:8000/subgraphs/name/3VLINC/union-dao/graphql',
  cache: new InMemoryCache(),
});

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

const { chains, publicClient } = configureChains(
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
        <ApolloProvider client={client}>
          <WagmiConfig config={config}>
            <Connect />
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
                  <Link to="/create">Create Union</Link>
                </li>
              </ul>
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/union/:id" element={<Union />} />
            </Routes>
          </WagmiConfig>
        </ApolloProvider>
      </Config>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
