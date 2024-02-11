import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import SectionDeleteForm from './SectionDeleteForm';

function sectionDeleteModal({
  section,
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
        <SectionDeleteForm
          section={section}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      )}
    </Dialog>
  );
}


sectionDeleteModal.propTypes = {
  section: PropTypes.object,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  open: PropTypes.bool
};

sectionDeleteModal.defaultProps = {
  section: {},
  onCancel: () => { },
  onDelete: () => { },
  open: false
};

export default sectionDeleteModal;
