import React, {
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import wait from 'src/utils/wait';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles,
  FormHelperText, CardHeader
} from '@material-ui/core';
import { updateUser } from 'src/store/actions/userActions';
import { UserRoles, StatusTypes } from 'src/constants';

const useStyles = makeStyles(() => ({
  root: {}
}));

function UserEditForm({
  className,
  user,
  sections,
  modules,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const sectionsOption = sections.map(({ id, name }) => ({ id, name, selected: user.sections.includes(id) }));
  const modulesOption = modules.map(({ id, name }) => ({ id, name, selected: user.modules.includes(id) }));

  const [selectedSections, setSelectedSections] = useState(user.sections);
  const [selectedModules, setSelectedModules] = useState(user.modules);

  if (!user) {
    user = {
      _id: '',
      email: '',
      role: 'Author',
      firstName: '',
      lastName: '',
      phone: '',
      status: 'Pending',
      verified: false,
      locked: false,
      sections: [],
      modules: []
    }
  }

  const handleSelectSection = (event, sectionId) => {
    if (!selectedSections.includes(sectionId)) {
      setSelectedSections((prevSelected) => [...prevSelected, sectionId]);
    } else {
      setSelectedSections((prevSelected) => prevSelected.filter((id) => id !== sectionId));
    }
  };

  const handleSelectModule = (event, moduleId) => {
    if (!selectedModules.includes(moduleId)) {
      setSelectedModules((prevSelected) => [...prevSelected, moduleId]);
    } else {
      setSelectedModules((prevSelected) => prevSelected.filter((id) => id !== moduleId));
    }
  };

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
        locked: user.locked || false,
        sections: user.sections || [],
        modules: user.modules || []
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        firstName: Yup.string().max(255).required('First Name is required'),
        lastName: Yup.string().max(255).required('Last Name is required'),
        phone: Yup.string().max(15),
        verified: Yup.bool(),
        locked: Yup.bool(),
        sections: Yup.array(),
        modules: Yup.array()
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          setSubmitting(false);
          values = { ...values, sections: selectedSections, modules: selectedModules };
          await dispatch(updateUser(values));
          enqueueSnackbar('User updated', {
            variant: 'success'
          });
          setStatus({ success: true });
          resetForm();
          history.push('/app/management/users');
        } catch (error) {
          console.log(error);

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
        touched,
        values
      }) => (
          <form
            className={clsx(classes.root, className)}
            onSubmit={handleSubmit}
            {...rest}
          >
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                lg={12}
              >
                <Box mt={3}>
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
                            {UserRoles.map((role) => (
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
                            {StatusTypes.map((status) => (
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
                  </Card>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
              >
                <Box mt={3}>
                  <Card>
                    <CardHeader
                      title="Sections"
                    />
                    <Divider />
                    <List>
                      {sectionsOption.map((section, i) => {
                        const isSectionSelected = selectedSections.includes(section.id);
                        return (
                          <ListItem
                            divider={i < section.length - 1}
                            key={section.id}
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={isSectionSelected}
                                onChange={(event) => handleSelectSection(event, section.id)}
                                value={isSectionSelected}
                              />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                              >
                                {section.name}
                              </Typography>
                            </ListItemText>

                          </ListItem>
                        )
                      })}
                    </List>
                  </Card>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
              >
                <Box mt={3}>
                  <Card>
                    <CardHeader
                      title="Modules"
                    />
                    <Divider />
                    <List>
                      {modulesOption.map((modules, i) => {
                        const isModuleSelected = selectedModules.includes(modules.id);
                        return (
                          <ListItem
                            divider={i < modules.length - 1}
                            key={modules.id}
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={isModuleSelected}
                                onChange={(event) => handleSelectModule(event, modules.id)}
                                value={isModuleSelected}
                              />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                              >
                                {modules.name}
                              </Typography>
                            </ListItemText>

                          </ListItem>
                        )
                      })}
                    </List>
                  </Card>
                </Box>
              </Grid>

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

                {errors.submit && (
                  <Box mt={3}>
                    <FormHelperText error>
                      {errors.submit}
                    </FormHelperText>
                  </Box>
                )}

              </Box>

            </Grid>
          </form>
        )
      }
    </Formik >
  );
}

UserEditForm.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default UserEditForm;
