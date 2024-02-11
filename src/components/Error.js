import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { Alert } from '@mui/lab';

function Error() {

  const { error } = useSelector((state) => {
    return state.error;
  });

  if (!error) {
    return null;
  }

  return (
    <Box mt={2}>
      <Alert
        severity="error"
      >
        {error}
      </Alert>
    </Box>
  );
}

export default Error;
