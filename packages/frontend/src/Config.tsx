import { PropsWithChildren, createContext, useContext } from 'react';
import { environment } from '../environments/environment';

interface ConfigContext {
  addresses: {
    diamond: string;
  };
}

const Context = createContext<ConfigContext>({
  addresses: {
    diamond: '',
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useConfig = () => useContext(Context);
