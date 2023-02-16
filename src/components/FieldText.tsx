import React from "react";
import { FieldBaseProps } from "./FieldBase";
import { TextField } from "@mui/material";
import { useField, propsEqual } from "@ezform/core";
import { memo, SyntheticEvent } from "react";

export interface FieldTextProps extends FieldBaseProps {
  multiline?: boolean;
  variant?: "filled" | "outlined" | "standard";
  color?: "primary" | "secondary";
  placeholder?: string;
}

export const FieldText = memo((props: FieldTextProps) => {
  const {
    id,
    name,
    form,
    validator = () => null,
    disabled,
    readonly = form.isReadonly,
    label,
    multiline = false,
    variant = "standard",
    color = "primary",
    placeholder,
    defaultValue
  } = props;

  useField(name, validator, form, defaultValue);

  const handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    form.setField(name, value);
  };

  return (
    <TextField
      error={form.hasError(name)}
      id={id}
      label={label}
      defaultValue={defaultValue}
      helperText={form.getHelperText(name)}
      onChange={handleChange}
      value={form.getField(name) ?? ""}
      placeholder={placeholder}
      color={color}
      variant={variant}
      multiline={multiline}
      disabled={disabled}
      fullWidth
    />
  );
}, propsEqual);
