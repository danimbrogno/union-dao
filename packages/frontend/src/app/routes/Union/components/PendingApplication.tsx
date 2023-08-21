import { ApplicationDetailFragment } from 'graphclient';
import { useUnionUserContext } from '../shared/UnionUserContext';
import { useContractWrite } from 'wagmi';
import { unionFacetABI } from 'shared';
import { useConfig } from 'frontend/shared/Config';
import { Hex, getAddress, hexToBigInt } from 'viem';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const PendingApplication = (props: ApplicationDetailFragment) => {
  const { isAdmin } = useUnionUserContext();
  const [admin, setAdmin] = useState(false);
  const { id } = useParams<'id'>();

  if (!id) {
    throw new Error('Missing ID');
  }

  const unionId = hexToBigInt(id as Hex);

  const {
    addresses: { diamond },
  } = useConfig();
  const { write, data, error, isError, isSuccess } = useContractWrite({
    abi: unionFacetABI,
    address: getAddress(diamond),
    functionName: 'approveApplication',
  });
  let approveButton = null;

  const handleApprove = () => {
    write({
      args: [BigInt(unionId), props.user.id, admin],
    });
  };

  const handleToggleAdmin = () => {
    setAdmin((_admin) => !_admin);
  };

  if (isAdmin) {
    approveButton = (
      <>
        <p>
          <label>
            <input
              id={`${props.id}-input`}
              checked={admin}
              onClick={handleToggleAdmin}
              type="checkbox"
            />{' '}
            Is Admin?
          </label>
        </p>
        <button onClick={handleApprove}>Approve</button>
      </>
    );
  }

  return (
    <div key={props.id}>
      {props.user.id}
      {approveButton}
    </div>
  );
};
