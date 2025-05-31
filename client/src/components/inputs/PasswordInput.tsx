import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    IconButton,
    InputAdornment,
    TextField,
    type TextFieldProps,
} from "@mui/material";
import { useState } from "react";

const PasswordInput = ({ ...rest }: TextFieldProps) => {
  const [hidden, setHidden] = useState(true);
  return (
    <TextField
      type={hidden ? "password" : "text"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setHidden(!hidden)}>
                {!hidden ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          ...rest?.slotProps?.input,
        },
        ...rest?.slotProps,
      }}
      {...rest}
    />
  );
};

export default PasswordInput;
