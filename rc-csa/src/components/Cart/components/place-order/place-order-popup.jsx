import {
  ConfirmationDialog,
  useModalState,
} from '@commercetools-frontend/application-components';
import { Spacings } from '@commercetools-frontend/ui-kit';
import { useCallback } from 'react';

const ChannelDeletion = () => {
  const confirmationModalState = useModalState(true);
  const handleConfirm = useCallback(() => {
    // Do something async
  }, []);

  return (
    <ConfirmationDialog
      title="Confirm channel deletion"
      isOpen={confirmationModalState.isModalOpen}
      onClose={confirmationModalState.closeModal}
      onCancel={confirmationModalState.closeModal}
      onConfirm={handleConfirm}
    >
      <Spacings.Stack scale="m">
        <Text.Body>{'Order is placed'}</Text.Body>
      </Spacings.Stack>
    </ConfirmationDialog>
  );
};
export default ChannelDeletion;
