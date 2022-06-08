import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import React from 'react';

const Input = ({
  half,
  name,
  handleChange,
  label,
  type,
  handleShowPassword,
  autoFocus,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      label={label}
      fullWidth
      onChange={handleChange}
      variant="outlined"
      required
      autoFocus={autoFocus}
      type={type}
      InputProps={
        name === 'password' || name === 'confirmPassword'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  </Grid>
);

export default Input;
