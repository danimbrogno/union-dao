import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { useConfig } from '../shared/Config';
import { unionFacetABI } from 'shared';
import { ChangeEvent, useState } from 'react';
import { getAddress, hexToString, stringToHex } from 'viem';
export const Example = () => {
  const {
    addresses: { diamond },
  } = useConfig();
  console.log('diamond address', diamond);
  const [name, setName] = useState('');
  const { data, isLoading } = useContractRead({
    address: getAddress(diamond),
    abi: unionFacetABI,
    functionName: 'getUnionName',
    args: [0n],
  });

  const { config } = usePrepareContractWrite({
    address: getAddress(diamond),
    abi: unionFacetABI,
    functionName: 'createUnion',
    args: [stringToHex(name, { size: 32 })],
  });

  const { write } = useContractWrite(config);

  console.log(data);

  if (isLoading) {
    return 'loading...';
  } else if (!data) {
    return 'not found';
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleSubmit(event: any): void {
    if (write) {
      write();
    }
  }

  return (
    <>
      <h1>{hexToString(data)}</h1>
      <input onChange={handleChange} value={name} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
