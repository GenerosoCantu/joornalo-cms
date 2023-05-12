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
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
// https://jpuri.github.io/react-draft-wysiwyg/#/demo
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ConfirmationDialog from 'src/components/ConfirmationDialog'
import FilesDropzone from './FilesDropzone';
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
import { updateStory, createStory } from 'src/store/actions/storyActions';
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

function StoryEditForm({
  className,
  story,
  sectionOptions,
  // covers,
  ...rest
}) {
  const classes = useStyles();
  const { t, i18n } = useTranslation(['translation', 'stories']);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const [imagePath, setImagePath] = useState(null)
  const [subsectionOptions, setSubsectionOptions] = useState([]);
  // const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(story.text))))
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(story ? story.text : ''))))
  const [images, setImages] = useState([]);

  // const [confirmDialog, setConfirmDialog] = useState(false);
  // const [activeSubStory, setActiveSubStory] = useState({});
  // const coversOption = covers.map(({ id, name }) => ({ id, name, selected: stories.covers.includes(id) }));
  // const [selectedCovers, setSelectedCovers] = useState(stories.covers);

  const saveButtonText = (!story?._id) ? "Create Story" : "Update Story";

  const subsectionOptionsUpdate = (sectionId) => {
    const selectedSection = sectionOptions.find((section) => {
      if (section.id == sectionId) {
        return section
      }
    })
    if (selectedSection) {
      setSubsectionOptions([
        ...[{ id: '', name: '' }],
        ...selectedSection.subsections
      ])
    } else {
      setSubsectionOptions([
        ...[{ id: '', name: '' }]
      ])
    }
  };

  const handleSectionChange = (event, setFieldValue) => {
    event.persist();
    subsectionOptionsUpdate(event.target.value, setFieldValue)
    setFieldValue('subsection', '');
  };

  const handleTextChange = (state, setFieldValue) => {
    setEditorState(state)
    setFieldValue('text', draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  useEffect(() => {
    // console.log(story)
    subsectionOptionsUpdate(story?.section)
    if (story?._id) {
      const folders = story._id.split('');
      setImagePath('story/' + folders[0] + '/' + folders[1] + '/' + folders[2] + '/' + story._id + '/')
    }
  }, [story]);

  const onImageUpdate = (serverImages, loadedImages) => {
    if (serverImages && loadedImages) {
      const images = [...serverImages, ...loadedImages.filter(image => image.filename).map((image) => {
        return { filename: image.filename, ratio: image.ratio, label: image.label }
      })]
      setImages(images)
    }
  }

  // const handleSelectCover = (event, coverId) => {
  //   if (!selectedCovers.includes(coverId)) {
  //     setSelectedCovers((stories) => [...stories, coverId]);
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
        _id: story?._id || null,
        date: story?.date || '',
        status: story?.status || 'Pending',
        title: story?.title || '',
        desc: story?.desc || '',
        text: story?.text || '',
        section: story?.section || '',
        subsection: story?.subsection || ''
        // covers: story.covers || [],
        // front_include_headlines: story.config.front_include_headlines || true,
        // front_include_most_viewed: story.config.front_include_most_viewed || true,
        // split_paragraphs: story.config.split_paragraphs || true,
        // summary_max_characters: story.config.summary_max_characters || 300,
        // photo_default_size: story.config.photo_default_size || 'df'
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .max(255, 'Maximum 255 characters')
          .required('Story Title is required'),
        // id: Yup.string()
        //   .max(128, 'Maximum 128 characters')
        //   .required('Story Id is required'),
        section: Yup.string()
          .required('Section is required'),
        desc: Yup.string()
          .max(500, 'Maximum 500 characters for Story Description'),
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
            images
            //   covers: selectedCovers,
            //   config: {
            //     front_include_headlines: values.front_include_headlines,
            //     front_include_most_viewed: values.front_include_most_viewed,
            //     split_paragraphs: values.split_paragraphs,
            //     summary_max_characters: values.summary_max_characters,
            //     photo_default_size: values.photo_default_size
            // }
          };
          if (!story?._id) {
            await dispatch(createStory(values));
          } else {
            console.log(values)
            await dispatch(updateStory(values));
          }
          enqueueSnackbar('Story updated', {
            variant: 'success'
          });
          setStatus({ success: true });
          resetForm();
          history.push('/app/stories');
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
                        <JooTextField label="Section" name="section" options={sectionOptions} displayEmpty={true} onBlur={ev => handleSectionChange(ev, setFieldValue)} />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Subsection" name="subsection" options={subsectionOptions} />
                      </Grid>

                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <JooTextField label="Title" name="title" />
                      </Grid>

                      {/* <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <JooTextField label="Story Id" name="id" />
                      </Grid> */}

                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <JooTextField label="Story Description" name="desc" rows="2" />
                      </Grid>

                      <Grid
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
                      </Grid>
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

            <Grid
              item
              xs={3}
              lg={3}
            >
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone
                      imagePath={imagePath}
                      onImageUpdate={onImageUpdate}
                      initialImages={story?.images}
                    />
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

StoryEditForm.propTypes = {
  className: PropTypes.string,
  story: PropTypes.object,
  sectionOptions: PropTypes.array.isRequired
};

export default StoryEditForm;
