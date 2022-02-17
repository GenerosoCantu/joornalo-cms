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
import { Formik, FieldArray } from 'formik';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import JooTextField from 'src/components/JooTextField';
import ConfirmationDialog from 'src/components/ConfirmationDialog'
import {
  PlusCircle as PlusCircleIcon
} from 'react-feather';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  IconButton,
  Fab,
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
  Toolbar,
  Tooltip,
  Typography,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  Edit as EditIcon,
  Trash as TrashIcon
} from 'react-feather';
import { updateSection, createSection } from 'src/store/actions/sectionActions';
import { SectionStatus, PhotoSizes } from 'src/constants';
import { CompareArrowsOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
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
    margin: '2px 0',
  },
  // cssOutlinedInput: {
  //   borderWidth: '1px',
  //   '&$cssFocused:not($error)': {
  //     borderColor: `${theme.palette.primary.main} !important`,
  //   }
  // },
  // cssHover: {
  //   '&:hover': {
  //     borderColor: "red !important"
  //   }
  // },
  // cssFocused: {},
  // notchedOutline: {
  //   borderWidth: '1px',
  //   '&not($error)': {
  //     borderColor: 'white !important'
  //   },
  //   '&$error': {
  //     borderColor: 'red !important'
  //   }
  // }
}));

function SectionEditForm({
  className,
  section,
  covers,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const [confirmDialog, setConfirmDialog] = useState(false);
  const [activeSubSection, setActiveSubSection] = useState({});
  const coversOption = covers.map(({ id, name }) => ({ id, name, selected: section.covers.includes(id) }));
  const [selectedCovers, setSelectedCovers] = useState(section.covers);

  const saveButtonText = (!section._id) ? "Create Section" : "Update Section";

  const handleSelectCover = (event, coverId) => {
    if (!selectedCovers.includes(coverId)) {
      setSelectedCovers((section) => [...section, coverId]);
    } else {
      setSelectedCovers((prevSelected) => prevSelected.filter((id) => id !== coverId));
    }
  };

  const onSubSectionDelete = (subsection) => {
    setConfirmDialog(true);
    setActiveSubSection(subsection);
  }

  const handleOnClickContinue = () => {
    setConfirmDialog(false);
  }

  const handleOnClickCancel = () => {
    setConfirmDialog(false);
  }

  Yup.addMethod(Yup.array, 'uniqueProperties', function (propertyNames) {
    return this.test('uniquepp', '', function (list) {
      const errors = [];
      propertyNames.map(([propertyName, message]) => {
        list.forEach((item, index) => {
          const propertyValue = item[propertyName];
          if (propertyValue && list.filter(item => item[propertyName] == propertyValue).length > 1) {
            errors.push(
              this.createError({
                path: `${this.path}[${index}].${propertyName}`,
                message,
              })
            );
          }
        });
      });

      if (errors.length > 0) {
        throw new Yup.ValidationError(errors);
      }

      return true;
    });
  });


  // Yup.addMethod(Yup.array, 'uniqueProperty', function (propertyName, message) {
  //   return this.test('uniquep', '', function (list) {
  //     const errors = [];
  //     list.forEach((item, index) => {
  //       const propertyValue = item[propertyName];
  //       if (propertyValue && list.filter(item => item[propertyName] == propertyValue).length > 1) {
  //         errors.push(
  //           this.createError({
  //             path: `${this.path}[${index}].${propertyName}`,
  //             message,
  //           })
  //         );
  //       }
  //     });

  //     if (errors.length > 0) {
  //       throw new Yup.ValidationError(errors);
  //     }

  //     return true;
  //   });
  // });


  // const toggleEditField = (index, soi, turnOn) => {
  //   let tmp = toggle;
  //   for (const key in tmp) {
  //     tmp[key] = false;
  //   }
  //   if (index >= 0) {
  //     tmp[`${soi}${index}`] = turnOn;
  //   }
  //   setToggle(tmp);
  //   setActive(!isActive);
  // }

  return (
    <Formik
      initialValues={{
        _id: section._id || null,
        id: section.id || '',
        name: section.name || '',
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
          .required('Must enter a numeric value.'),
        subsections: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string()
                .required("Sub-Section Name required"),
              id: Yup.string()
                .required("Sub-Section Id required")
            })
          )
          .uniqueProperties([
            ['id', 'Id must be unique'],
            ['name', 'Name must be unique']
          ])

      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          setSubmitting(false);
          values = {
            ...values,
            covers: selectedCovers,
            config: {
              front_include_headlines: values.front_include_headlines,
              front_include_most_viewed: values.front_include_most_viewed,
              split_paragraphs: values.split_paragraphs,
              summary_max_characters: values.summary_max_characters,
              photo_default_size: values.photo_default_size
            }
          };
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
                        <JooTextField label="Section Name" name="name" />
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
                        <JooTextField label="Section Id" name="id" />
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
              sm={12}
              md={6}
            >

              <Grid
                item
                sm={12}
                md={12}
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

              <Grid
                item
                xs={12}
                sm={12}
              >
                <Box mt={3}>
                  <Card>
                    <Toolbar
                      style={{ paddingLeft: 16 }}
                      variant="dense"
                    >
                      <Typography
                        variant="h4"
                      >Covers</Typography>
                    </Toolbar>
                    <Table>
                      <TableBody>
                        {coversOption.map((cover, i) => {
                          const isCoverSelected = selectedCovers.includes(cover.id);
                          return (
                            <TableRow
                              hover
                              key={cover.id}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isCoverSelected}
                                  onChange={(event) => handleSelectCover(event, cover.id)}
                                  value={isCoverSelected}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {cover.name}
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
              md={6}
            >
              <Box mt={3}>

                <FieldArray name="subsections">
                  {arrayHelpers => (
                    <Card>
                      <Toolbar
                        style={{ paddingLeft: 16, paddingRight: 20, paddingTop: 5, flexGrow: 1 }}
                        variant="dense"
                      >
                        <Typography
                          variant="h4"
                          style={{ flex: 1 }}
                        >Sub-Sections</Typography>

                        <Tooltip title="Add Sub-Section" aria-label="Add Sub-Section">
                          <Fab
                            onClick={() => arrayHelpers.push({
                              "id": "",
                              "name": ""
                            })}
                            size="small"
                            color="primary"
                            aria-label="add">
                            <AddIcon />
                          </Fab>
                        </Tooltip>

                        {/* <IconButton
                          onClick={() => arrayHelpers.push({
                            "id": "",
                            "name": ""
                          })}
                          color="primary"
                          aria-label="Add Sub-Sections"
                        >
                          <PlusCircleIcon />
                        </IconButton> */}

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
                              key={index}
                              style={{ height: 33 }}
                            >
                              <TableCell
                                className={classes.subsec}
                              >
                                <JooTextField
                                  className={classes.denseInput}
                                  label=""
                                  name={`subsections.${index}.name`}
                                  margin="dense"
                                  inputRef={(input) => {
                                    if (input && input.value === '') {
                                      input.focus();
                                    }
                                  }}
                                // InputProps={{
                                //   classes: {
                                //     root: classes.cssOutlinedInput,
                                //     focused: classes.cssFocused,
                                //     notchedOutline: classes.notchedOutline
                                //   },
                                //   inputMode: "numeric"
                                // }}
                                />
                              </TableCell>

                              <TableCell
                                className={classes.subsec}
                              >
                                <JooTextField
                                  className={classes.denseInput}
                                  label=""
                                  name={`subsections.${index}.id`}
                                  margin="dense"
                                // InputProps={{
                                //   classes: {
                                //     root: classes.cssOutlinedInput,
                                //     focused: classes.cssFocused,
                                //     notchedOutline: classes.notchedOutline,
                                //   },
                                //   inputMode: "numeric"
                                // }}
                                />
                              </TableCell>

                              <TableCell
                                align="right"
                              >
                                <Tooltip title="Delete Sub-Section" aria-label="Delete Sub-Section">
                                  <IconButton
                                    // onClick={() => onSubSectionDelete(subsection)}
                                    onClick={() => arrayHelpers.remove(index)}
                                    tabIndex="-1"
                                  >
                                    <SvgIcon fontSize="small">
                                      <TrashIcon />
                                    </SvgIcon>
                                  </IconButton>
                                </Tooltip>
                              </TableCell>

                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      <ConfirmationDialog
                        subsecion={activeSubSection}
                        open={confirmDialog}
                        onClickCancel={handleOnClickCancel}
                        onClickContinue={handleOnClickContinue}
                      />

                    </Card>
                  )}
                </FieldArray>
              </Box>
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
