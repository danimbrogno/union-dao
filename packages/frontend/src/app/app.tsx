import styled from '@emotion/styled';
import {Splash, AdminOnboard, AdminDash} from './components';

import { Route, Routes, Link } from 'react-router-dom';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

`;

export function App() {
  return (
    <StyledApp>

      <Routes>
        <Route path="/" element={<Splash/>}  />
        <Route path="/admin-onboard" element={<AdminOnboard />}/>
        <Route path="/admin-dash" element={<AdminDash/>}/>
      </Routes>
    </StyledApp>
  );
}

export default App;
