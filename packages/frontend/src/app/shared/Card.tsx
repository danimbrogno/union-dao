import * as React from 'react';
import { useUnionCardSvg } from './useUnionCardSvg';

export const Card = ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  const __html = useUnionCardSvg({ name, password });

  return <svg dangerouslySetInnerHTML={{ __html }} viewBox="0 0 877 1388" />;
};
