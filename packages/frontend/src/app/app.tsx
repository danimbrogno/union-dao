import styled from '@emotion/styled';
import {ConnectWallet, RegisterUnion, MemberDash, AdminDash, RegisterMember } from './Routes/routes';
import { useState, useEffect} from 'react'; 
import { Route, Routes } from 'react-router-dom';
import { useAccount, useContractReads } from 'wagmi'
import {unionFacetABI}  from '../abis/generated'
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
  const [isMember, setIsMember] = useState<boolean | null >(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null >(null);
  const {addresses} = useConfig() 
  const [unionContract] = useState(({
    address: `0x${addresses.diamond.slice(0,3)}`,
    abi: unionFacetABI,
  }));

  useEffect(() => {
    if (isConnected && entity) {
    const {data, isError, isLoading, isSuccess} =  useContractReads({
      contracts: [ 
        {address: `0x${addresses.diamond.slice(0,3)}`, abi: unionFacetABI, functionName: 'isMember'},
        {address: `0x${addresses.diamond.slice(0,3)}`, abi: unionFacetABI, functionName: 'isAdmin'}
      ],
    })
    if (isSuccess && data?.length) {
      if (data[0].result) {
        setIsMember(true) 
      } else {setIsMember(false)}
    }
    if (isSuccess && data?.length) {
      if (data[1].result) {
        setIsAdmin(true) 
      } else {setIsAdmin(false)}
    }

  }
  }, [isConnected])

  return (
      <StyledApp>
      <Routes>
      {isConnected ?  <Route path="/member-dash" element={<MemberDash/>}/>: 
      <Route path="/" element={<ConnectWallet/>}  /> }

      <Route path="/register-member" element={<RegisterMember/>}/>

      <Route path="/register-union" element={<RegisterUnion/>}/>
      <Route path="/admin-dash" element={<AdminDash/>}/>

      </Routes>
      </StyledApp>
      );
}

export default App;
