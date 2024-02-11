import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import UserDeleteForm from './UserDeleteForm';

function userDeleteModal({
  user,
  onCancel,
  onDelete,
  open,
  ...rest
}) {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      onClose={onCancel}
      open={open}
      {...rest}
    >
      {/* Dialog renders its body even if not open */}
      {open && (
        <UserDeleteForm
          user={user}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      )}
    </Dialog>
  );
}


userDeleteModal.propTypes = {
  user: PropTypes.object,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  open: PropTypes.bool
};

userDeleteModal.defaultProps = {
  user: {},
  onCancel: () => { },
  onDelete: () => { },
  open: false
};

export default userDeleteModal;
