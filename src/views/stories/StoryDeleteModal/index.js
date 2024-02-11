import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import StoryDeleteForm from './StoryDeleteForm';

function storyDeleteModal({
  story,
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
      {open && (
        <StoryDeleteForm
          story={story}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      )}
    </Dialog>
  );
}


storyDeleteModal.propTypes = {
  story: PropTypes.object,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  open: PropTypes.bool
};

storyDeleteModal.defaultProps = {
  story: {},
  onCancel: () => { },
  onDelete: () => { },
  open: false
};

export default storyDeleteModal;
