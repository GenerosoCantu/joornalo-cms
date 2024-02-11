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
import { deleteSection } from 'src/store/actions/sectionActions';

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

function equalTo(name) {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: `Name must be the same as ${name}`,
    test: (value) => value === name
  })
};

Yup.addMethod(Yup.string, 'equalTo', equalTo);

function SectionDeleteForm({
  section,
  onCancel,
  onDelete
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Required').equalTo(`${section.name}`)
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(deleteSection(section._id))

          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Section Deleted', {
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
              Delete Section
            </Typography>
          </Box>
          <Box p={3}>
            <TextField
              fullWidth
              label="Name"
              name="namex"
              onBlur={handleBlur}
              onChange={handleChange}
              value={`${section.name}`}
              variant="outlined"
              disabled
            />
          </Box>
          <Box p={3}>
            <TextField
              error={Boolean(errors.name)}
              fullWidth
              helperText={errors.name}
              label={`Please enter '${section.name}'`}
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              variant="outlined"
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

SectionDeleteForm.propTypes = {
  section: PropTypes.object,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func
};

SectionDeleteForm.defaultProps = {
  section: {},
  onCancel: () => { },
  onDelete: () => { }
};

export default SectionDeleteForm;
