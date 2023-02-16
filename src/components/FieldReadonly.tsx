import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "&:hover": {
    border: "transparent"
  },
  "& label": {
    color: "#333"
  },
  "& label.Mui-focused": {
    color: "#333"
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "transparent"
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "transparent"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "transparent"
  }
}));

export const FieldReadonly = (props) => (
  <StyledTextField
    {...props}
    variant="standard"
    inputProps={{ readOnly: true }}
    InputLabelProps={{ shrink: true }}
  />
);
