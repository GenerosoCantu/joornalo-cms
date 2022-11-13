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
// import Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import JooTextField from 'src/components/JooTextField';
import { withFormik } from 'formik';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
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
  }
}));

function StoryEditForm({
  className,
  story,
  sectionOptions,
  ...rest
}) {
  const classes = useStyles();
  const { t, i18n } = useTranslation(['translation', 'stories']);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const [subsectionOptions, setSubsectionOptions] = useState([]);
  // const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(story.text))))
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const saveButtonText = (!story._id) ? "Create Story" : "Update Story";

  useEffect(() => {
    console.log(story)
    subsectionOptionsUpdate(story.section)
  }, [story]);

  const subsectionOptionsUpdate = (sectionId,) => {
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
    }
  };

  const handleSectionChange = (event, setFieldValue) => {
    console.log(event.target.value)
    event.persist();
    subsectionOptionsUpdate(event.target.value, setFieldValue)
    setFieldValue('subsection', '');
  };

  const handleTextChange = (state, setFieldValue) => {
    console.log(state)
    setEditorState(state)
    // console.log(editorState.getCurrentContent())
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    // setFieldValue('text', draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };

  const formikEnhancer = withFormik({
    mapPropsToValues: props => ({
      _id: story._id || null,
      // id: story.id || '',
      date: story.date || '',
      status: story.status || 'Inactive',
      title: story.title || '',
      desc: story.desc || '',
      section: story.section || '',
      subsection: story.subsection || '',
      text: story.text || '',
      // text: (story.text) ? new EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(story.text))) : '',
      // editorState: (story.text) ? new EditorState.createWithContent(ContentState.createFromText(story.text)) : '',
    }),
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .max(255, 'Maximum 255 characters')
        .required('Story Title is required'),
      section: Yup.string()
        .required('Section is required'),
      desc: Yup.string()
        .max(500, 'Maximum 500 characters for Story Description')
    }),
    // handleSubmit: (values, { setSubmitting }) => {

    handleSubmit:
      async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        // you probably want to transform draftjs state to something else, but I'll leave that to you.
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
          if (!story._id) {
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
      },
    displayName: 'MyForm',
  });

  const MyForm = ({
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    isSubmitting,
  }) => (
    <form onSubmit={handleSubmit}>
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
                        onEditorStateChange={state => handleTextChange(state, setFieldValue)}
                      />
                    </Paper>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <textarea
                      name="text"
                      value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
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
  );

  const MyEnhancedForm = formikEnhancer(MyForm);


  return (
    <MyEnhancedForm story={story} />
  );
}

StoryEditForm.propTypes = {
  className: PropTypes.string,
  story: PropTypes.object.isRequired,
  sectionOptions: PropTypes.array.isRequired
};

export default StoryEditForm;
