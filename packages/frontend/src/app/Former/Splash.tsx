import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import logo from '../assets/rocky.jpeg'
import login from '../assets/login.jpg'
const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Header = () => (
  <header>
    <h1>Welcome to Union Dao</h1>
    <h2>Blockchain-Powered Unity: Empowering Workers, Strengthening Unions!</h2>
  </header>
);

const logoStyle = css`
  width: 75px;
  height: 75px;
  `
const Logo = () => (
  <div>
    <img src={logo} css={logoStyle} alt="Union Dao Logo" />
  </div>
);

const SetupButton = () => (
  <button>
    Set up my Union
  </button>
);

const loginStyle = css`
width: 75px;
height 75 px;
`
const Login = () => (
  <div>
    <Link to="/login">Login</Link> 
  </div>
);

const Splash = () => (
  <CenteredDiv>
  <Header />
  <Logo />
  <SetupButton />
  <br/> 
  <br/>
  <Login />
  </CenteredDiv>
);

export default Splash;

