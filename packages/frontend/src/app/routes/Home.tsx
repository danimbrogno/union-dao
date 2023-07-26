import { useConfig } from '../shared/Config';

export const Home = () => {
  const { addresses } = useConfig();

  return <p>Diamond contract address is: {addresses.diamond}</p>;
};
