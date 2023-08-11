import { PropsWithChildren, createContext, useContext } from 'react';
import { environment } from '../../environments/environment';

interface ConfigContext {
  addresses: {
    diamond: string;
  };
  ipfs: {
    nodeAddress: string;
    gatewayAddress: string;
  };
}

const Context = createContext<ConfigContext>({
  addresses: {
    diamond: '',
  },
  ipfs: {
    nodeAddress: '',
    gatewayAddress: '',
  },
});

export const Config = ({ children }: PropsWithChildren) => {
  console.log(environment.addresses);

  if (!environment.addresses.diamond) {
    throw new Error(
      'Diamond address not set in environment. Did you forget to run `nx deploy contracts`?'
    );
  }

  return (
    <Context.Provider
      value={{
        addresses: {
          diamond: environment.addresses.diamond,
        },
        ipfs: {
          nodeAddress: environment.ipfs.nodeAddress,
          gatewayAddress: environment.ipfs.gatewayAddress,
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useConfig = () => useContext(Context);
