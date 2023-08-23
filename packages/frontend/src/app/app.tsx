import { Route, Routes } from 'react-router-dom';
import { Config } from './shared/Config';
import { Home } from './routes/Home/Home';
import { Create } from './routes/Create/Create';
import { Create as ProposalCreate } from './routes/Union/routes/Proposals/Create/Create';
import { Union } from './routes/Union/Union';
import { IPFS } from './shared/IPFS';
import { Proposal } from './routes/Union/routes/Proposals/Proposal/Proposal';
import { WagmiProvider } from './shared/WagmiProvider';
import { Join } from './routes/Union/routes/Join/Join';
import { Global, ThemeProvider, css } from '@emotion/react';
import { theme } from './app.theme';
import { Membership } from './routes/Membership/Membership';

const styles = css`
  /* Global CSS Reset */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Remove default margins */
  html,
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    margin: 0;
    padding: 0;
    font-family: 'Arial', 'sans-serif';
    color: #131111;
  }

  /* Remove list bullets */
  ol,
  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.link};
  }

  /* Make html and body flex components */
  html,
  body,
  #root {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
`;

export function App() {
  return (
    <>
      <Global styles={styles} />
      <ThemeProvider theme={theme}>
        <Config>
          <IPFS>
            <WagmiProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/union/:unionId" element={<Union />} />
                <Route path="/union/:unionId/join" element={<Join />} />
                <Route
                  path="/union/:unionId/proposal/create"
                  element={<ProposalCreate />}
                />
                <Route
                  path="/union/:unionId/proposal/:proposalId"
                  element={<Proposal />}
                />
              </Routes>
            </WagmiProvider>
          </IPFS>
        </Config>
      </ThemeProvider>
    </>
  );
}

export default App;
