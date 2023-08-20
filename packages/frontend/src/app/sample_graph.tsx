import { useState, useEffect } from 'react';
import execute from 'graph-client'; // Import the generated artifact
import { gql } from '@graphprotocol/graph-client'; // Import gql for query

// ... other imports ...

// GraphQL query to get isMember and isAdmin for a specific entity
const GET_ENTITY_ROLE = gql`
  query GetEntityRole($entityId: Bytes!) {
    userRole(where: { id: $entityId }) {
      isMember
      isAdmin
    }
  }
`;

export function App() {
  const { isConnected } = useAccount();
  const [entity, setEntity] = useState<string | null>("Steve");
  const { addresses } = useConfig();
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (isConnected && entity) {
      // Query the data using GraphClient's execute function
      async function fetchData() {
        const result = await execute(GET_ENTITY_ROLE, { entityId: entity });
        if (result && result.userRole) {
          setIsMember(result.userRole.isMember);
          setIsAdmin(result.userRole.isAdmin);
        }
      }
      fetchData();
    }
  }, [isConnected, entity]);

  return (
    <StyledApp>
      <Routes>
        {isConnected ? <Route path="/member-dash" element={<MemberDash />} /> :
          <Route path="/" element={<ConnectWallet />} />} 
        {/* Render "/" conditionally */}
        <Route path="/register-member" element={<RegisterMember />} />
        <Route path="/register-union" element={<RegisterUnion />} />
        <Route path="/admin-dash" element={<AdminDash />} />
      </Routes>
    </StyledApp>
  );
}

export default App;

