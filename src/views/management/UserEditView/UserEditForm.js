import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import wait from 'src/utils/wait';

const roles = [
  {
    id: 'Admin',
    name: 'Admin'
  },
  {
    id: 'Author',
    name: 'Author'
  },
  {
    id: 'Editor',
    name: 'Editor'
  },
  {
    id: 'Contributor',
    name: 'Contributor'
  }
];

const statusType = [
  {
    id: 'Active',
    name: 'Active'
  },
  {
    id: 'Inactive',
    name: 'Inactive'
  },
  {
    id: 'Pending',
    name: 'Pending'
  },
  {
    id: 'Suspended',
    name: 'Suspended'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

export function updateUser(update) {
  const request = axios.patch(`http://localhost:4000/users/${update._id}`, update);
  console.log('request*****************************');
  console.log(request);
}

function UserEditForm({
  className,
  user,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        _id: user._id || '',
        email: user.email || '',
        role: user.role || 'Author',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        status: user.status || 'Pending',
        verified: user.verified || true,
        locked: user.locked || false
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        firstName: Yup.string().max(255).required('First Name is required'),
        lastName: Yup.string().max(255).required('Last Name is required'),
        phone: Yup.string().max(15),
        verified: Yup.bool(),
        locked: Yup.bool()
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          updateUser(values);
          //resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('User updated', {
            variant: 'success',
            action: <Button>See all</Button>
          });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        }
        console.log('+++++++++');
        //history.push('/app/management/users');
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
          <form
            className={clsx(classes.root, className)}
            onSubmit={handleSubmit}
            {...rest}
          >

            <Card>
              <CardContent>

                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Role"
                      name="role"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={values.role}
                      variant="outlined"
                    >
                      {roles.map((role) => (
                        <option
                          key={role.id}
                          value={role.id}
                        >
                          {role.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth
                      helperText={touched.firstName && errors.firstName}
                      label="First Name"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      label="Last Name"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.lastName}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.phone && errors.phone)}
                      fullWidth
                      helperText={touched.phone && errors.phone}
                      label="Phone Number"
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Status"
                      name="status"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={values.status}
                      variant="outlined"
                    >
                      {statusType.map((status) => (
                        <option
                          key={status.id}
                          value={status.id}
                        >
                          {status.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography
                      variant="h5"
                      color="textPrimary"
                    >
                      Email Verified
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      Disabling this will automatically send the user a verification
                      email
                    </Typography>
                    <Switch
                      checked={values.verified}
                      color="secondary"
                      edge="start"
                      name="verified"
                      onChange={handleChange}
                      value={values.verified}
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography
                      variant="h5"
                      color="textPrimary"
                    >
                      Locked
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      Locked account can not login into the system.
                    </Typography>
                    <Switch
                      checked={values.locked}
                      color="secondary"
                      edge="start"
                      name="locked"
                      onChange={handleChange}
                      value={values.verified}
                    />
                  </Grid>

                </Grid>
              </CardContent>
              <Divider />
              <Box
                p={2}
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Update User
                </Button>
              </Box>
            </Card>
          </form>
        )}
    </Formik>
  );
}

UserEditForm.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default UserEditForm;
