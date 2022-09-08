import React, { forwardRef } from 'react';
import { TextField } from '@material-ui/core';

interface inputType{
    name: string;
    placeholder: string;
}
// technique for automatically passing a ref through a component to one of its children.
// Its useful in reusable component library
export const Input = forwardRef((props:inputType, ref) => {
  return (
    <TextField
        variant="outlined"
        margin="normal"
        inputRef={ref}
        fullWidth
        type="text"
        {...props}
    ></TextField>
  )
})