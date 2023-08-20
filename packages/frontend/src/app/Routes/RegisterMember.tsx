import styled from '@emotion/styled';
import logo from '../assets/rocky.jpeg'
import { Link } from 'react-router-dom';

const Logo = styled.img`
width: 45px;
`

const RegisterMember = () => {
  const 
    return (
        <>
        <Logo src={logo} /> 
        <p> You are not a member of any Unions yet </p>
        {/* TODO: Implement QR Code */}
        <p> QR CODE </p>
        <p> SCAN QR CODE </p>
        <Link to="/setup-union"> Setup my own Union</Link>
        </> 
        )
}

export default RegisterMember
