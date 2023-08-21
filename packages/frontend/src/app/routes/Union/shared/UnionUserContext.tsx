import { ExecutionResult } from 'graphql';
import {
  IsUserAdminOfUnionDocument,
  IsUserAdminOfUnionQuery,
  execute,
} from 'graphclient';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

export interface Context {
  isAdmin: boolean;
}

const context = createContext<Context>({
  isAdmin: true,
});

export const UserUnionContext = ({ children }: PropsWithChildren) => {
  const { address } = useAccount();

  const { id: unionId } = useParams<'id'>();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  if (!unionId) {
    throw new Error('Missing Union ID');
  }

  const fetchUnionDetail = useCallback(async () => {
    console.log(unionId);
    execute(IsUserAdminOfUnionDocument, {
      id: address,
      unionId,
    })
      .then((result: ExecutionResult<IsUserAdminOfUnionQuery>) => {
        console.log(result.data);
        const foundRoles = result?.data?.user?.roles.length || 0;
        if (foundRoles > 0) {
          setIsAdmin(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [address, unionId]);

  useEffect(() => {
    fetchUnionDetail();
  }, [fetchUnionDetail]);

  if (loading) {
    return null;
  }

  return <context.Provider value={{ isAdmin }}>{children}</context.Provider>;
};

export const useUnionUserContext = () => useContext(context);
