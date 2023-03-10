import React from "react";
import { useField } from "@ezform/core";
import { FormControl, FormHelperText, Grid, Switch } from "@mui/material";
import { FieldBaseProps } from "./FieldBase";

export interface FieldSwitchProps extends FieldBaseProps {
  color?: "default" | "primary" | "secondary";
  labelBefore?: string;
  size?: "medium" | "small";
}

export const FieldSwitch = (props: FieldSwitchProps) => {
  const {
    id,
    name,
    form,
    validator = () => null,
    disabled,
    readonly = form.isReadonly,
    label,
    labelBefore,
    color = "secondary",
    size,
    defaultValue
  } = props;

  useField(name, validator, form, defaultValue);

  const handleChange = (e) => {
    form.setField(name, e.target.checked);
  };

  return (
    <FormControl error={form.hasError(name)}>
      <Grid container alignItems="center">
        {labelBefore && <Grid item>{labelBefore}</Grid>}
        <Grid item>
          <Switch
            id={id}
            checked={form.getField(name) || false}
            size={size}
            color={color}
            onChange={!readonly && handleChange}
            inputProps={{ readOnly: readonly }}
            disabled={disabled}
            readOnly={readonly}
          />
        </Grid>
        {label && <Grid item>{label}</Grid>}
      </Grid>
      {form.hasError(name) && (
        <FormHelperText error>{form.getHelperText(name)}</FormHelperText>
      )}
    </FormControl>
  );
};
