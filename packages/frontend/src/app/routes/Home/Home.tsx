import Chrome from 'frontend/shared/Chrome/Chrome';
import styled from '@emotion/styled';
import logo from './Logo.svg';
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1 0 100%;
`;
const StyledH1 = styled.h1`
  margin: 20px 0;
`;

const StyledP = styled.p`
  text-align: center;
  line-height: 1.5rem;
`;
const StyledImg = styled.img`
  max-width: 400px;
  height: auto;
`;

export const Home = () => {
  return (
    <Chrome>
      <StyledDiv>
        <StyledImg src={logo} alt="Logo" />
        <StyledH1>Workers of the World Unite</StyledH1>

        <StyledP>
          Union is a blockchain-based decentralized application (dApp) designed
          for managing organized labour. It leverages the transparency,
          security, and immutability of blockchain technology to ensure fair and
          efficient management of labour resources. Workers can join unions and
          participate in anonymous voting powered by zero-knowledge proofs.
        </StyledP>
      </StyledDiv>
    </Chrome>
  );
};
