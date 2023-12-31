import { Identity as ID } from '@semaphore-protocol/identity';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { getAddress } from 'viem';
import { ConnectorData, useAccount, useSignMessage } from 'wagmi';

const Context = createContext({
  identity: '',
});

type Inputs = {
  passphrase: string;
};

const nullSignature = '0x0000000000000000000000000000000000000000';
export const Identity = ({ children }: PropsWithChildren) => {
  const { address, isConnected, connector: activeConnector } = useAccount();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<Inputs>();
  const [identity, setIdentity] = useLocalStorage(
    `identity-${address}`,
    address || getAddress(nullSignature)
  );

  const { data, signMessage } = useSignMessage();

  useEffect(() => {
    const clearIdentity = () => {
      setIdentity(getAddress(nullSignature));
    };
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (account) {
        clearIdentity();
      } else if (chain) {
        clearIdentity();
      }
    };

    if (activeConnector) {
      activeConnector.on('change', handleConnectorUpdate);
    }

    return () => {
      activeConnector?.off('change', handleConnectorUpdate);
    };
  }, [activeConnector, setIdentity]);

  useEffect(() => {
    if (identity === nullSignature && data) {
      setIdentity(data);
    }
  }, [data, identity, setIdentity]);

  const onSubmit: SubmitHandler<Inputs> = async ({ passphrase }) => {
    signMessage({ message: passphrase });
  };

  if (!isConnected) {
    return null;
  } else if (identity === nullSignature) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('passphrase', { required: true })}
          type="text"
          placeholder="Enter your passphrase to load your identity"
        />
        <input
          disabled={!isValid || isSubmitting}
          type="submit"
          value="Submit"
        />
      </form>
    );
  }

  return <Context.Provider value={{ identity }}>{children}</Context.Provider>;
};

export const useGetIdentity = () => {
  const val = useCallback((password: string) => {
    return new ID(password);
  }, []);

  return val;
};
