import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

const JooTextField = ({
  label,
  required,
  rows,
  options,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      label={label}
      required={required}
      multiline={rows ? true : false}
      rows={rows}
      {...field}
      helperText={errorText}
      error={!!errorText}
      variant="outlined"
      fullWidth
      select={options ? true : false}
      SelectProps={{ native: true }}
    >
      {options &&
        options.map((option) => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.name}
          </option>
        ))
      }
    </TextField>
  );
};

export default JooTextField;
