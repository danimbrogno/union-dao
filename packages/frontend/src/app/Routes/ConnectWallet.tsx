import styled from '@emotion/styled';
import logo from '../assets/rocky.jpeg'
import {Connect} from './Connect';

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
      <Connect /> 
      </>
      );
}
export default ConnectWallet
