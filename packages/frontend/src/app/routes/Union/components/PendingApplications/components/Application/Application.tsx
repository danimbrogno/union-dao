import { ApplicationDetailFragment, WatchUnionDetailsQuery } from 'graphclient';
import { useContractWrite } from 'wagmi';
import { unionFacetABI } from 'shared';
import { useConfig } from 'frontend/shared/Config';
import { Hex, getAddress } from 'viem';
import { useState } from 'react';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';
import { UserMetadata } from 'frontend/app.interface';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';
import styled from '@emotion/styled';
import { SecondaryButton } from 'ui/SecondaryButton';
import { useApproveApplication } from './hooks/useApproveApplication';

const ApproveRow = styled.div`
  display: flex;
  gap: 1rem;
  padding: 10px 0;
  align-items: center;
`;
export const Application = ({
  application,
  isAdmin,
  onApproved,
}: {
  application: ApplicationDetailFragment;
  isAdmin?: boolean;
  onApproved: (data: WatchUnionDetailsQuery, unionId: string) => void;
}) => {
  const [admin, setAdmin] = useState(false);
  const { data: metadata } = useFetchJsonFromCid<UserMetadata>(
    application.user.metadata || undefined
  );

  let approveButton = null;

  const { onApprove } = useApproveApplication({
    admin,
    userId: application.user.id,
    onApproved,
  });

  const handleToggleAdmin = () => {
    setAdmin((_admin) => !_admin);
  };

  if (isAdmin) {
    approveButton = (
      <ApproveRow>
        <div>
          <label>
            <input
              id={`${application.id}-input`}
              checked={admin}
              onClick={handleToggleAdmin}
              type="checkbox"
            />{' '}
            Is Admin?
          </label>
        </div>
        <SecondaryButton onClick={onApprove}>Approve</SecondaryButton>
      </ApproveRow>
    );
  }

  return (
    <div>
      {metadata?.name || application.user.id}
      {approveButton}
    </div>
  );
};
