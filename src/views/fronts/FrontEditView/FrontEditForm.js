import React, {
  useState,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import DatePicker from '@mui/lab/DatePicker';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import JooTextField from 'src/components/JooTextField';
// import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
// https://jpuri.github.io/react-draft-wysiwyg/#/demo
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import ConfirmationDialog from 'src/components/ConfirmationDialog'
// import FilesDropzone from './FilesDropzone';
import {
  PlusCircle as PlusCircleIcon
} from 'react-feather';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
  Paper,
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
  FormHelperText
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Edit as EditIcon,
  Trash as TrashIcon,
  Grid as GridIcon
} from 'react-feather';
import { updateFront, createFront } from 'src/store/actions/frontActions';
import { Status, PhotoSizes } from 'src/constants';
import { CompareArrowsOutlined } from '@mui/icons-material';


const useStyles = makeStyles((theme) => ({
  root: {},
  editorMain: {
    padding: '0 14px'
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

function FrontEditForm({
  className,
  tenant,
  front,
  sectionOptions,
  // covers,
  ...rest
}) {
  const classes = useStyles();
  const { t, i18n } = useTranslation(['translation', 'fronts']);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(front.text))))
  // const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(front.text))))

  // const [confirmDialog, setConfirmDialog] = useState(false);
  // const [activeSubFront, setActiveSubFront] = useState({});
  // const coversOption = covers.map(({ id, name }) => ({ id, name, selected: fronts.covers.includes(id) }));
  // const [selectedCovers, setSelectedCovers] = useState(fronts.covers);

  const saveButtonText = (!front._id) ? "Create Front" : "Update Front";

  const handleSectionChange = (event, setFieldValue) => {
    console.log(event.target.value)
    event.persist();
  };

  // const handleTextChange = (state, setFieldValue) => {
  //   console.log(state)
  //   setEditorState(state)
  //   setFieldValue('text', draftToHtml(convertToRaw(editorState.getCurrentContent())));
  // };

  // const handleSelectCover = (event, coverId) => {
  //   if (!selectedCovers.includes(coverId)) {
  //     setSelectedCovers((fronts) => [...fronts, coverId]);
  //   } else {
  //     setSelectedCovers((prevSelected) => prevSelected.filter((id) => id !== coverId));
  //   }
  // };

  // const handleOnClickContinue = () => {
  //   setConfirmDialog(false);
  // }

  // const handleOnClickCancel = () => {
  //   setConfirmDialog(false);
  // }



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
        _id: front._id || null,
        date: front.date || '',
        status: front.status || 'Inactive',
        section: front.section || '',
      }}
      validationSchema={Yup.object().shape({
        section: Yup.string()
          .required('Section is required'),
        // summary_max_characters: Yup.number()
        //   .typeError('Must be a numeric value.')
        //   .integer('Must be a integer value.')
        //   .required('Must enter a numeric value.')
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
            //   covers: selectedCovers,
            //   config: {
            //     front_include_headlines: values.front_include_headlines,
            //     front_include_most_viewed: values.front_include_most_viewed,
            //     split_paragraphs: values.split_paragraphs,
            //     summary_max_characters: values.summary_max_characters,
            //     photo_default_size: values.photo_default_size
            // }
          };
          if (!front._id) {
            await dispatch(createFront(values));
          } else {
            console.log(values)
            await dispatch(updateFront(values));
          }
          enqueueSnackbar('Front updated', {
            variant: 'success'
          });
          setStatus({ success: true });
          resetForm();
          navigate(`/app/${tenant}/fronts`);
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
        setFieldValue,
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
              xs={9}
              lg={9}
            >
              <Box mt={3}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      spacing={1}
                    >
                      <Grid
                        item
                        xs={12}
                      >

                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Section</TableCell>
                              <TableCell>Title</TableCell>
                              <TableCell>Image</TableCell>
                              <TableCell align="center">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {front.stories.map((story, i) => (
                              <TableRow>
                                <TableCell className={classes.fontWeightMedium}>
                                  {i} - {story.section}
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {story.headline}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    Image
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                  // onClick={() => onFrontDelete(front)}
                                  >
                                    <SvgIcon fontSize="small">
                                      <GridIcon />
                                    </SvgIcon>
                                  </IconButton>
                                  <IconButton
                                    component={RouterLink}
                                    to={`/app/${tenant}/fronts/${story._id}`}
                                  >
                                    <SvgIcon fontSize="small">
                                      <EditIcon />
                                    </SvgIcon>
                                  </IconButton>
                                  <IconButton
                                  // onClick={() => onFrontDelete(front)}
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

                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid
              item
              xs={3}
              lg={3}
            >
              <Box mt={3}>
                <Card>
                  <CardContent>

                    <Grid
                      container
                      spacing={1}
                    >
                      <Grid
                        item
                        xs={12}
                      >
                        <DatePicker
                          className={classes.datePicker}
                          renderInput={props => <TextField label="Date" />}
                          format="MM/DD/YYYY"
                          name="date"
                          inputVariant="outlined"
                          // value={date}
                          autoOk={true}
                          disableFuture={true}
                          disableToolbar={true}
                          variant="dialog"
                          clearable={true}
                          clearLabel={t('translation:Clear')}
                          showTodayButton={true}
                          todayLabel={t('translation:Today')}
                          margin="dense"
                        // onChange={handleDateChange}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                      >
                        <JooTextField label="Status" name="status" options={Status} margin="dense" />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                      >
                        <JooTextField label="Section" name="section" options={sectionOptions} onBlur={ev => handleSectionChange(ev, setFieldValue)} margin="dense" />
                      </Grid>

                    </Grid>

                  </CardContent>
                </Card>
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

FrontEditForm.propTypes = {
  className: PropTypes.string,
  front: PropTypes.object.isRequired,
  sectionOptions: PropTypes.array.isRequired
};

export default FrontEditForm;
