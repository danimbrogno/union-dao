import styled from '@emotion/styled';
import { Route, Routes, Link } from 'react-router-dom';
import { Config } from './shared/Config';
import { Home } from './routes/Home';
import { Connect } from './components/Connect';
import { Create } from './routes/Create/Create';
import { Create as ProposalCreate } from './routes/Union/routes/Proposals/Create';
import { Union } from './routes/Union/Union';
import { IPFS } from './shared/IPFS';
import { Proposal } from './routes/Union/routes/Proposals/Proposal/Proposal';
import { Identity } from './shared/Identity';
import { WagmiProvider } from './shared/WagmiProvider';
import { Join } from './routes/Union/routes/Join';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Config>
        <IPFS>
          <WagmiProvider>
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
                <Route path="/union/:id/join" element={<Join />} />
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
          </WagmiProvider>
        </IPFS>
      </Config>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
