import { useIPFS } from 'frontend/shared/IPFS';
import { useEffect } from 'react';

export const useProposalMetadata = (cid?: string) => {
  const { ipfs } = useIPFS();

  useEffect(() => {
    const load = async () => {
      if (cid) {
        const repeater = ipfs.cat(cid);

        for await (const result of repeater) {
          console.log('watching...');
          const jsonResult = JSON.parse(new TextDecoder().decode(result));
          console.log('0', jsonResult);
        }
      }
    };
    load();
  }, [cid, ipfs]);

  return { cid };
};
