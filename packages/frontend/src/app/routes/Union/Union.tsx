import {
  UnionDetailsDocument,
  UnionDetailsQuery,
  execute,
} from '../../../../.graphclient';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Union = () => {
  const params = useParams();
  const [unionDetailQuery, setUnionDetailQuery] = useState<UnionDetailsQuery>();

  const fetchUnionDetail = useCallback(async () => {
    if (!params.id) return;

    const result = await execute(UnionDetailsDocument, { id: params.id });
    if (result.data) {
      setUnionDetailQuery(result.data);
    }
  }, [params.id]);

  useEffect(() => {
    fetchUnionDetail();
  }, [fetchUnionDetail]);

  if (unionDetailQuery?.union) {
    return (
      <div>
        {unionDetailQuery.union.id}: {unionDetailQuery.union.name}
      </div>
    );
  }
  return null;
};
