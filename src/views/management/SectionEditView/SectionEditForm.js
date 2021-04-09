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
import Toolbar from '@material-ui/core/Toolbar';
import JooTextField from 'src/components/JooTextField';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  IconButton,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  SvgIcon,
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
  FormHelperText
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Trash as TrashIcon
} from 'react-feather';
import { updateSection, createSection } from 'src/store/actions/sectionActions';
import { SectionStatus, PhotoSizes } from 'src/constants';


const useStyles = makeStyles(() => ({
  root: {},
  configCell: {
    width: '180px'
  },
  hidden: {
    display: 'none'
  },
  subsec: {
    width: '43%',
    cursor: 'pointer'
  },
  denseInput: {
    margin: '2px 0'
  }
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

  const [toggle, setToggle] = useState({});
  const [isActive, setActive] = useState("false");

  // const sectionsOption = sections.map(({ id, name }) => ({ id, name, selected: section.sections.includes(id) }));
  // const modulesOption = modules.map(({ id, name }) => ({ id, name, selected: section.modules.includes(id) }));

  // const [selectedSections, setSelectedSections] = useState(section.sections);
  // const [selectedModules, setSelectedModules] = useState(section.modules);

  // const selectedSomeSections = selectedSections.length > 0 && selectedSections.length < sectionsOption.length;

  // const selectedSomeModules = selectedModules.length > 0 && selectedModules.length < modulesOption.length;

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


  const onSubSectionDelete = (SubSectionId) => {
    console.log(SubSectionId);
  }

  const toggleEditField = (index, soi, turnOn) => {
    let tmp = toggle;
    for (const key in tmp) {
      tmp[key] = false;
    }
    if (index >= 0) {
      tmp[`${soi}${index}`] = turnOn;
    }
    setToggle(tmp);
    setActive(!isActive);
  }


  return (
    <Formik
      initialValues={{
        name: section.name || '',
        id: section.id || '',
        email: section.email || '',
        status: section.status || 'Inactive',
        desc: section.desc || '',
        subsections: section.subsections || [],
        covers: section.covers || [],
        front_include_headlines: section.config.front_include_headlines || true,
        front_include_most_viewed: section.config.front_include_most_viewed || true,
        split_paragraphs: section.config.split_paragraphs || true,
        summary_max_characters: section.config.summary_max_characters || 300,
        photo_default_size: section.config.photo_default_size || 'df'
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(255, 'Maximum 255 characters')
          .required('Section Name is required'),
        id: Yup.string()
          .max(128, 'Maximum 128 characters')
          .required('Section Id is required'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(255, 'Maximum 255 characters')
          .required('Section Email is required'),
        desc: Yup.string()
          .max(500, 'Maximum 500 characters for Section Description'),
        summary_max_characters: Yup.number()
          .typeError('Must be a numeric value.')
          .integer('Must be a integer value.')
          .required('Must enter a numeric value.')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        console.log(values);
        try {
          console.log(values);

          setSubmitting(false);

          // values = { ...values, sections: selectedSections, modules: selectedModules };
          // if (!section._id) {
          //   await dispatch(createSection(values));
          // } else {
          //   await dispatch(updateSection(values));
          // }
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
                        <JooTextField label="Section Name" name="name" required />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Status" name="status" options={SectionStatus} />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Section Id" name="id" required />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Section Email" name="email" />
                      </Grid>

                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <JooTextField label="Section Description" name="desc" rows="2" />
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
                  <Toolbar
                    style={{ paddingLeft: 16 }}
                    variant="dense"
                  >
                    <Typography
                      variant="h4"
                    >Sub-Sections</Typography>
                  </Toolbar>
                  <Table
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          Name
                        </TableCell>
                        <TableCell>
                          Id
                        </TableCell>
                        <TableCell align="right">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.subsections.map((subsection, index) => (
                        <TableRow
                          hover
                          key={subsection.id}
                          style={{ height: 33 }}
                        >
                          <TableCell
                            className={classes.subsec}
                          >
                            <div
                              tabindex="0"
                              className={toggle[`s${index}`] ? classes.hidden : null}
                              onKeyPress={() => toggleEditField(index, 's', true)}
                              onClick={() => toggleEditField(index, 's', true)}>

                              {subsection.name}
                            </div>
                            <div
                              className={!toggle[`s${index}`] ? classes.hidden : null}
                            >
                              <JooTextField
                                className={classes.denseInput}
                                label=""
                                name={`subsections.${index}.name`}
                                margin="dense"
                                onBlur={() => toggleEditField(index, 's', false)}
                                inputRef={input => input && input.focus()}
                                required />
                            </div>

                          </TableCell>

                          <TableCell
                            className={classes.subsec}
                          >
                            <div
                              tabindex="0"
                              className={toggle[`i${index}`] ? classes.hidden : null}
                              onKeyPress={() => toggleEditField(index, 'i', true)}
                              onClick={() => toggleEditField(index, 'i', true)}>
                              {subsection.id}
                            </div>
                            <div
                              className={!toggle[`i${index}`] ? classes.hidden : null}
                            >
                              <JooTextField
                                className={classes.denseInput}
                                label=""
                                name={`subsections.${index}.id`}
                                margin="dense"
                                onBlur={() => toggleEditField(index, 'i', false)}
                                inputRef={input => input && input.focus()}
                                required />
                            </div>
                          </TableCell>

                          <TableCell
                            align="right"
                          >
                            <IconButton
                              onClick={() => onSubSectionDelete(subsection.id)}
                              tabindex="-1"
                            >
                              <SvgIcon fontSize="small">
                                <TrashIcon />
                              </SvgIcon>
                            </IconButton>
                          </TableCell>

                        </TableRow>
                      ))}

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
                  <Toolbar
                    style={{ paddingLeft: 16 }}
                    variant="dense"
                  >
                    <Typography
                      variant="h4"
                    >Configuration</Typography>
                  </Toolbar>
                  <Table
                    size="small"
                  >
                    <TableBody>
                      <TableRow>

                        <TableCell>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            Include <b>Section Headlines</b> in Front page
                        </Typography>
                        </TableCell>
                        <TableCell padding="default" align="right" className={classes.configCell}>
                          <Checkbox
                            checked={values.front_include_headlines}
                            name="front_include_headlines"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>

                        <TableCell>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            Include section <b>Top News</b> in Front page
                        </Typography>
                        </TableCell>
                        <TableCell padding="default" align="right" className={classes.configCell}>
                          <Checkbox
                            checked={values.front_include_most_viewed}
                            name="front_include_most_viewed"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>

                        <TableCell>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            <b>Split Paragraphs</b> before saving
                        </Typography>
                        </TableCell>
                        <TableCell padding="default" align="right" className={classes.configCell}>
                          <Checkbox
                            checked={values.split_paragraphs}
                            name="split_paragraphs"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            <b>Summary</b> maximum <b>characters</b>
                          </Typography>
                        </TableCell>
                        <TableCell padding="default" align="right" className={classes.configCell}>
                          <JooTextField
                            label=""
                            name="summary_max_characters"
                            margin="dense"
                            className={classes.denseInput}
                            required
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            <b>Photo</b> default <b>size</b>
                          </Typography>
                        </TableCell>
                        <TableCell padding="default" align="right" className={classes.configCell}>
                          <JooTextField
                            label=""
                            name="photo_default_size"
                            margin="dense"
                            options={PhotoSizes}
                            className={classes.denseInput}
                          />
                        </TableCell>
                      </TableRow>

                    </TableBody>
                  </Table>

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

            {/* <Divider />
            <Box >
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <Divider />
              <div>{JSON.stringify(errors, null, 2)}</div>
            </Box> */}

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
