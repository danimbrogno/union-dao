import styled from '@emotion/styled';
import logo from '../assets/rocky.jpeg'
import { debug, warn } from 'console';

const Logo = styled.img`
width: 45px;
`
const H1 = styled.h1`
`
const Subheading = styled.h3``

const ConnectButton = styled.button``

const ConnectWallet = () => {

  return (
      <>
      <Logo src={logo} /> 
      <H1 /> 
      <Subheading /> 
      <ConnectButton />  
      </>
      );
}
export default ConnectWallet
