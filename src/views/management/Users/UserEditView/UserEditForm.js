import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import JooTextField from 'src/components/JooTextField';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import { updateUser, createUser } from 'src/store/actions/userActions';
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

  const selectedSomeSections = selectedSections.length > 0 && selectedSections.length < sectionsOption.length;
  const selectedAllSections = selectedSections.length === sectionsOption.length;

  const selectedSomeModules = selectedModules.length > 0 && selectedModules.length < modulesOption.length;
  const selectedAllModules = selectedModules.length === modulesOption.length;

  const saveButtonText = (!user._id) ? "Create User" : "Update User";

  const handleSelectSection = (event, sectionId) => {
    if (!selectedSections.includes(sectionId)) {
      setSelectedSections((module) => [...module, sectionId]);
    } else {
      setSelectedSections((prevSelected) => prevSelected.filter((id) => id !== sectionId));
    }
  };

  const handleSelectModule = (event, moduleId) => {
    if (!selectedModules.includes(moduleId)) {
      setSelectedModules((section) => [...section, moduleId]);
    } else {
      setSelectedModules((prevSelected) => prevSelected.filter((id) => id !== moduleId));
    }
  };

  const handleSelectAllSections = (event) => {
    setSelectedSections(event.target.checked
      ? sectionsOption.map((section) => section.id)
      : []);
  };

  const handleSelectAllModules = (event) => {
    setSelectedModules(event.target.checked
      ? modulesOption.map((module) => module.id)
      : []);
  };

  return (
    <Formik
      initialValues={{
        _id: user._id || null,
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
        email: Yup.string().email('Must be a valid email').max(255, 'Email Address must be at most 255 characters').required('Email is required'),
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
          if (!user._id) {
            await dispatch(createUser(values));
          } else {
            await dispatch(updateUser(values));
          }
          enqueueSnackbar('User updated', {
            variant: 'success'
          });
          setStatus({ success: true });
          resetForm();
          history.push('/app/management/users');
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
        touched,
        values
      }) => (
        <Form
          className={clsx(classes.root, className)}
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
                        <JooTextField label="Email Address" name="email" />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Role" name="role" options={UserRoles} />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="First Name" name="firstName" />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Last Name" name="lastName" />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Phone Number" name="phone" />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Status" name="status" options={StatusTypes} />
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
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedAllSections}
                            indeterminate={selectedSomeSections}
                            onChange={handleSelectAllSections}
                          />
                        </TableCell>
                        <TableCell>
                          Access to this Sections
                          </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sectionsOption.map((section, i) => {
                        const isSectionSelected = selectedSections.includes(section.id);
                        return (
                          <TableRow
                            hover
                            key={section.id}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isSectionSelected}
                                onChange={(event) => handleSelectSection(event, section.id)}
                                value={isSectionSelected}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                              >
                                {section.name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>

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
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedAllModules}
                            indeterminate={selectedSomeModules}
                            onChange={handleSelectAllModules}
                          />
                        </TableCell>
                        <TableCell>
                          Access to this Modules
                          </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {modulesOption.map((module, i) => {
                        const isModuleSelected = selectedModules.includes(module.id);
                        return (
                          <TableRow
                            hover
                            key={module.id}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isModuleSelected}
                                onChange={(event) => handleSelectModule(event, module.id)}
                                value={isModuleSelected}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                              >
                                {module.name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Card>
              </Box>
            </Grid>

          </Grid>

          <Grid
            item
            sm={12}
          >
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
                {saveButtonText}
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
        </Form>
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
