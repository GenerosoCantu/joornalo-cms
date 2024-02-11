import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  useDispatch
} from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { deleteStory } from 'src/store/actions/storyActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  confirmButton: {
    marginLeft: theme.spacing(2)
  },
  deleteButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  deleteIcon: {
    marginRight: theme.spacing(1)
  }
}));

function StoryDeleteForm({
  story,
  onCancel,
  onDelete
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(deleteStory(story._id))

          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Story Deleted', {
            variant: 'success'
          });

          onDelete();

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
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
              color="textPrimary"
            >
              Delete Story
            </Typography>
          </Box>
          <Box p={3}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={`${story.title}`}
              variant="outlined"
              disabled
            />
          </Box>
          <Box p={3}>
            <TextField
              fullWidth
              label="Description"
              name="desc"
              onBlur={handleBlur}
              onChange={handleChange}
              value={`${story.desc}`}
              variant="outlined"
              disabled
            />
          </Box>
          <Divider />
          <Box
            p={2}
            display="flex"
            alignItems="center"
          >
            <Box flexGrow={1} />
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="secondary"
              className={classes.deleteButton}
            >
              Delete
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

StoryDeleteForm.propTypes = {
  story: PropTypes.object,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func
};

StoryDeleteForm.defaultProps = {
  story: {},
  onCancel: () => { },
  onDelete: () => { }
};

export default StoryDeleteForm;
