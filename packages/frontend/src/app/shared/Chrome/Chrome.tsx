import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Connect } from './components/Connect';
import { useAccount } from 'wagmi';
import { ProjectSelector } from './components/ProjectSelector/ProjectSelector';
const StyledContainer = styled.div`
  color: ${(props) => props.theme.colors.color1};
  background: ${(props) => '#fbfad7'};

  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.color6};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  flex: 0;
`;

const StyledH1 = styled.h1`
  flex: 4;
  a {
    color: ${(props) => props.theme.colors.color5};
  }
`;

const StyledNav = styled.nav`
  ul {
    display: flex;
    gap: 1rem;
    margin: 0 30px;
  }
  li {
    margin: 0 10px;
  }
  a {
    color: ${(props) => props.theme.colors.white};
    text-decoration: none;
  }
`;

const StyledMain = styled.main`
  color: ${(props) => props.theme.colors.color1};
  flex-grow: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledScroll = styled.div`
  padding: 40px;
  display: flex;
  min-height: min-content;
`;

const StyledFooter = styled.footer`
  flex: 0;
  padding: 20px;
  text-align: center;
  p {
    color: ${(props) => props.theme.colors.color5};
  }
`;

const Chrome = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledH1>
          <Link to="/">Union</Link>
        </StyledH1>
        <StyledNav>
          <ul>
            <li>
              <Link to="/create">Create a Union</Link>
            </li>
          </ul>
        </StyledNav>
        {isConnected && <ProjectSelector />}
        {!isConnected && <Connect />}
      </StyledHeader>
      <StyledMain>
        <StyledScroll>{children}</StyledScroll>
      </StyledMain>
      <StyledFooter>
        <p>Soliditary meets Solidity</p>
      </StyledFooter>
    </StyledContainer>
  );
};

export default Chrome;
