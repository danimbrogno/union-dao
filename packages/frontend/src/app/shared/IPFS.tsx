import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { IPFSHTTPClient, create } from 'kubo-rpc-client';
import { useConfig } from './Config';

export interface Context {
  ipfs: IPFSHTTPClient;
  gatewayUrl: (cid: string) => string;
}

const IPFSContext = createContext<Context>({
  ipfs: null as any,
  gatewayUrl: (cid: string) => '',
});

export const IPFS = (props: PropsWithChildren) => {
  const {
    ipfs: { nodeAddress, gatewayAddress },
  } = useConfig();
  const ipfs = create({ url: nodeAddress });
  const gatewayUrl = useCallback(
    (cid: string) => `${gatewayAddress}/${cid}`,
    []
  );
  return <IPFSContext.Provider value={{ ipfs, gatewayUrl }} {...props} />;
};

export const useIPFS = () => useContext(IPFSContext);
