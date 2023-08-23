import { useParams } from 'react-router-dom';

export const useUnionIdParam = () => {
  const { unionId } = useParams<'unionId'>();
  if (!unionId) {
    throw new Error('Missing union id');
  }
  return unionId;
};
