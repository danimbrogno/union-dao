import { ApplicationDetailFragment } from 'graphclient';
import { useUnionUserContext } from '../../../shared/UnionUserContext';
import { useContractWrite } from 'wagmi';
import { unionFacetABI } from 'shared';
import { useConfig } from 'frontend/shared/Config';
import { Hex, getAddress, hexToBigInt } from 'viem';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';
import { UserMetadata } from 'frontend/app.interface';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';

export const PendingApplication = ({
  application,
}: {
  application: ApplicationDetailFragment;
}) => {
  const { isAdmin } = useUnionUserContext();
  const unionId = useUnionIdParam();
  const [admin, setAdmin] = useState(false);
  const { data: metadata } = useFetchJsonFromCid<UserMetadata>(
    application.user.metadata || undefined
  );

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
      args: [BigInt(unionId), application.user.id as Hex, admin],
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
              id={`${application.id}-input`}
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
    <div>
      {application.user.id}
      {approveButton}
    </div>
  );
};
