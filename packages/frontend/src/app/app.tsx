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
import { Create } from './routes/Create/Create';
import { Create as ProposalCreate } from './routes/Union/routes/Proposals/Create';
import { Union } from './routes/Union/Union';
import { IPFS } from './shared/IPFS';
import { Proposal } from './routes/Union/routes/Proposals/Proposal';
import { Identity } from './shared/Identity';

//
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

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Config>
        <IPFS>
          <WagmiConfig config={config}>
            <Connect />
            <Identity>
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
                <Route
                  path="/union/:id/proposal/create"
                  element={<ProposalCreate />}
                />
                <Route
                  path="/union/:id/proposal/:proposalId"
                  element={<Proposal />}
                />
              </Routes>
            </Identity>
          </WagmiConfig>
        </IPFS>
      </Config>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
