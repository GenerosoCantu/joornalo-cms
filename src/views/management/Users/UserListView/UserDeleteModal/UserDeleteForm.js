import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  useDispatch
} from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { deleteUser } from 'src/store/actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  confirmButton: {
    marginLeft: theme.spacing(2)
  },
  deleteButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  deleteIcon: {
    marginRight: theme.spacing(1)
  }
}));

function equalTo(email) {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: `Email must be the same as ${email}`,
    test: (value) => value === email
  })
};

Yup.addMethod(Yup.string, 'equalTo', equalTo);

function UserDeleteForm({
  user,
  onCancel,
  onDelete
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Required').equalTo(`${user.email}`)
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(deleteUser(user._id))

          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('User Deleted', {
            variant: 'success'
          });

          onDelete();

        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
              color="textPrimary"
            >
              Delete User
            </Typography>
          </Box>
          <Box p={3}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={`${user.firstName} ${user.lastName}`}
              variant="outlined"
              disabled
            />
          </Box>
          <Box p={3}>
            <TextField
              error={Boolean(errors.email)}
              fullWidth
              helperText={errors.email}
              label={`Please enter '${user.email}'`}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              variant="outlined"
            />
          </Box>
          <Divider />
          <Box
            p={2}
            display="flex"
            alignItems="center"
          >
            <Box flexGrow={1} />
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="secondary"
              className={classes.deleteButton}
            >
              Delete
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

UserDeleteForm.propTypes = {
  user: PropTypes.object,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func
};

UserDeleteForm.defaultProps = {
  user: {},
  onCancel: () => { },
  onDelete: () => { }
};

export default UserDeleteForm;
