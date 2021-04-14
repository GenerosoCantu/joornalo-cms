import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

const JooTextField = ({
  label,
  required,
  rows,
  options,
  margin,
  onBlur,
  className,
  inputRef,
  autoFocus,
  InputProps,
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
      margin={margin}
      onBlur={onBlur}
      className={className}
      inputRef={inputRef}
      autoFocus={autoFocus}
      InputProps={InputProps}
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
