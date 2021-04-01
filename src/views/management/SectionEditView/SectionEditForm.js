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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  makeStyles,
  FormHelperText, CardHeader
} from '@material-ui/core';
import { updateSection, createSection } from 'src/store/actions/sectionActions';
// import { SectionRoles, StatusTypes } from 'src/constants';


const useStyles = makeStyles(() => ({
  root: {}
}));

function SectionEditForm({
  className,
  section,
  sections,
  modules,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  // const sectionsOption = sections.map(({ id, name }) => ({ id, name, selected: section.sections.includes(id) }));
  // const modulesOption = modules.map(({ id, name }) => ({ id, name, selected: section.modules.includes(id) }));

  // const [selectedSections, setSelectedSections] = useState(section.sections);
  // const [selectedModules, setSelectedModules] = useState(section.modules);

  // const selectedSomeSections = selectedSections.length > 0 && selectedSections.length < sectionsOption.length;
  // const selectedAllSections = selectedSections.length === sectionsOption.length;

  // const selectedSomeModules = selectedModules.length > 0 && selectedModules.length < modulesOption.length;
  // const selectedAllModules = selectedModules.length === modulesOption.length;

  const saveButtonText = (!section._id) ? "Create Section" : "Update Section";

  // const handleSelectSection = (event, sectionId) => {
  //   if (!selectedSections.includes(sectionId)) {
  //     setSelectedSections((module) => [...module, sectionId]);
  //   } else {
  //     setSelectedSections((prevSelected) => prevSelected.filter((id) => id !== sectionId));
  //   }
  // };

  // const handleSelectModule = (event, moduleId) => {
  //   if (!selectedModules.includes(moduleId)) {
  //     setSelectedModules((section) => [...section, moduleId]);
  //   } else {
  //     setSelectedModules((prevSelected) => prevSelected.filter((id) => id !== moduleId));
  //   }
  // };

  // const handleSelectAllSections = (event) => {
  //   setSelectedSections(event.target.checked
  //     ? sectionsOption.map((section) => section.id)
  //     : []);
  // };

  // const handleSelectAllModules = (event) => {
  //   setSelectedModules(event.target.checked
  //     ? modulesOption.map((module) => module.id)
  //     : []);
  // };

  return (
    <Formik
      initialValues={{
        _id: section._id || null,
        email: section.email || '',
        role: section.role || 'Author',
        firstName: section.firstName || '',
        lastName: section.lastName || '',
        phone: section.phone || '',
        status: section.status || 'Pending',
        verified: section.verified || true,
        locked: section.locked || false,
        sections: section.sections || [],
        modules: section.modules || []
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
          // values = { ...values, sections: selectedSections, modules: selectedModules };
          if (!section._id) {
            await dispatch(createSection(values));
          } else {
            await dispatch(updateSection(values));
          }
          enqueueSnackbar('Section updated', {
            variant: 'success'
          });
          setStatus({ success: true });
          resetForm();
          history.push('/app/management/sections');
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
                      {/* 
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
                          {SectionRoles.map((role) => (
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
                          label="Section Name"
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid> */}

                      {/* <Grid
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
                          Disabling this will automatically send the section a verification
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
                      </Grid> */}

                    </Grid>

                  </CardContent>
                </Card>
              </Box>
            </Grid>
            {/* 
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

            <Divider /> */}
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
        </form>
      )
      }
    </Formik >
  );
}

SectionEditForm.propTypes = {
  className: PropTypes.string,
  section: PropTypes.object.isRequired
};

export default SectionEditForm;
