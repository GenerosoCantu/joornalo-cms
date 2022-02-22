import React, {
  useState
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
import { updateStory, createStory } from 'src/store/actions/storyActions';
import { StoryStatus, PhotoSizes } from 'src/constants';
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

function StoryEditForm({
  className,
  story,
  // covers,
  ...rest
}) {
  const classes = useStyles();
  const { t, i18n } = useTranslation(['translation', 'stories']);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  // const [confirmDialog, setConfirmDialog] = useState(false);
  // const [activeSubStory, setActiveSubStory] = useState({});
  // const coversOption = covers.map(({ id, name }) => ({ id, name, selected: stories.covers.includes(id) }));
  // const [selectedCovers, setSelectedCovers] = useState(stories.covers);

  console.log('stories----------------------------')
  console.log(story)

  const saveButtonText = (!story._id) ? "Create Story" : "Update Story";

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
        _id: story._id || null,
        // id: story.id || '',
        date: story.date || '',
        status: story.status || 'Inactive',
        title: story.title || '',
        desc: story.desc || '',
        text: story.text || '',
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
        // email: Yup.string()
        //   .email('Must be a valid email')
        //   .max(255, 'Maximum 255 characters')
        //   .required('Story Email is required'),
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
                        <JooTextField label="Status" name="status" options={StoryStatus} />
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
                        <JooTextField label="Story Description" name="text" rows="10" />
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

StoryEditForm.propTypes = {
  className: PropTypes.string,
  story: PropTypes.object.isRequired
};

export default StoryEditForm;
