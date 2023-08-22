import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
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
    [gatewayAddress]
  );

  return <IPFSContext.Provider value={{ ipfs, gatewayUrl }} {...props} />;
};

export const useIPFS = () => useContext(IPFSContext);

export function useFetchJsonFromCid<T>(cid?: string) {
  const { ipfs } = useIPFS();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  useEffect(() => {
    const load = async () => {
      if (cid) {
        const repeater = ipfs.cat(cid);

        for await (const result of repeater) {
          console.log('watching...');
          setData(JSON.parse(new TextDecoder().decode(result)));
        }
        setLoading(false);
      }
    };
    load();
  }, [cid, ipfs]);

  return { data, loading };
}
