import { PropsWithChildren, createContext, useContext } from 'react';
import { IPFSHTTPClient, create } from 'kubo-rpc-client';

export interface Context {
  ipfs: IPFSHTTPClient;
}

const IPFSContext = createContext<Context>({
  ipfs: null as any,
});

export const IPFS = (props: PropsWithChildren) => {
  const ipfs = create({ url: 'http://localhost:5001/api/v0' });

  return <IPFSContext.Provider value={{ ipfs }} {...props} />;
};

export const useIPFS = () => useContext(IPFSContext);
