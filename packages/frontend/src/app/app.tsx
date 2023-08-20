import styled from '@emotion/styled';
import {ConnectWallet, RegisterUnion, MemberDash, AdminDash, RegisterMember } from './Routes/routes';
import { useState, useEffect} from 'react'; 
import { Route, Routes } from 'react-router-dom';
import { useAccount, useContractReads } from 'wagmi'
import UnionABI from '../abis/UnionABI.json'
import {useConfig} from '../Config'
const StyledApp = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
text-align: center;
`;

export function App() {
  const {isConnected} = useAccount();
  const [entity, setEntity] = useState<string | null>("Steve");
  const {addresses} = useConfig() 
  const [unionContract] = useState(({
    address: `0x${addresses.diamond.slice(0,3)}`,
    abi: UnionABI,
  }));

  useEffect(() => {
    if (isConnected && entity) {
    const {data, isError, isLoading} =  useContractReads({
      contracts: [ 
        {address: `0x${addresses.diamond.slice(0,3)}`, abi: [UnionABI], functionName: 'isMember'},
        {address: `0x${addresses.diamond.slice(0,3)}`, abi: [UnionABI], functionName: 'isAdmin'}

      ],
    })
  }
  }, [isConnected])

  return (
      <StyledApp>
      <Routes>
      {isConnected?  <Route path="/member-dash" element={<MemberDash/>}/>: 
      <Route path="/" element={<ConnectWallet/>}  /> }
      {/* Render "/" conditionally */ }

      <Route path="/register-member" element={<RegisterMember/>}/>

      <Route path="/register-union" element={<RegisterUnion/>}/>
      <Route path="/admin-dash" element={<AdminDash/>}/>

      </Routes>
      </StyledApp>
      );
}

export default App;
