import styled from '@emotion/styled';
import { Route, Routes, Link } from 'react-router-dom';
import { Config } from './shared/Config';
import { Home } from './routes/Home';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Config>
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
      </Config>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
