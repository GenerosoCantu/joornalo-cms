import React, {
  useState,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardDatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
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
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  Edit as EditIcon,
  Trash as TrashIcon
} from 'react-feather';
import { updateFront, createFront } from 'src/store/actions/frontActions';
import { Status, PhotoSizes } from 'src/constants';
import { CompareArrowsOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {},
  // configCell: {
  //   width: '180px'
  // },
  // hidden: {
  //   display: 'none'
  // },
  // subsec: {
  //   width: '43%',
  //   cursor: 'pointer'
  // },
  // denseInput: {
  //   margin: '2px 0',
  // },
  editorMain: {
    padding: '0 14px'
  }

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
  const history = useHistory();

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
          history.push(`/app/${tenant}/fronts`);
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
                      spacing={3}
                    >
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <KeyboardDatePicker
                          className={classes.datePicker}
                          label="Date"
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
                        // onChange={handleDateChange}
                        />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Status" name="status" options={Status} />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Section" name="section" options={sectionOptions} onBlur={ev => handleSectionChange(ev, setFieldValue)} />
                      </Grid>

                      {/* <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <JooTextField label="Title" name="title" />
                      </Grid> */}

                      {/* <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Front Id" name="id" />
                      </Grid> */}


                      {/* <Grid
                          item
                          md={12}
                          xs={12}
                        >
                          <Paper
                            component={Box}
                            mt={3}
                          >
                            <Editor
                              editorState={editorState}
                              editorClassName={classes.editorMain}
                              onEditorStateChange={state => handleTextChange(state, setFieldValue)}
                            />
                          </Paper>
                        </Grid> */}
                      {/* 
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <textarea
                          name="text"
                          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        />
                      </Grid> */}

                    </Grid>

                  </CardContent>
                </Card>
              </Box>
            </Grid>

            {/* <Grid
              item
              xs={3}
              lg={3}
            >
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone />
                  </CardContent>
                </Card>
              </Box>
            </Grid> */}


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
