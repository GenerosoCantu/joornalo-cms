import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

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
  onChange,
  displayEmpty,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  if (!onChange) {
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
        // SelectProps={{ native: true }}
        SelectProps={{ native: true, displayEmpty: true }}
      >
        {displayEmpty && (
          <option
            key='0'
            value={null}
          ></option>
        )}
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
  } else {
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
        // SelectProps={{ native: true }}
        SelectProps={{ native: true, displayEmpty: true }}
        onChange={onChange}
      >
        {displayEmpty && (
          <option
            key='0'
            value={null}
          ></option>
        )}
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
  }
};

export default JooTextField;
