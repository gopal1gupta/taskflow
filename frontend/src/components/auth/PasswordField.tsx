import { forwardRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import type { TextFieldProps } from "@mui/material/TextField";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <TextField
        {...props}
        inputRef={ref}
        fullWidth
        margin="normal"
        type={showPassword ? "text" : "password"}
        InputProps={{
          ...props.InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;