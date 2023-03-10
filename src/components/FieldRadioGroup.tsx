import React, { memo, SyntheticEvent } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText
} from "@mui/material";
import {OptionType} from "./OptionType";

export interface FieldRadioGroupProps extends FieldBaseProps {
  options: OptionType[];
  color?: "default" | "primary" | "secondary";
}

export const FieldRadioGroup = memo((props: FieldRadioGroupProps) => {
  const {
    id,
    name,
    form,
    validator = () => null,
    label,
    readonly = form.isReadonly,
    options,
    color = "secondary",
    defaultValue
  } = props;

  useField(name, validator, form, defaultValue);

  const handleChange = (e, value) => {
    form.setField(name, value);
  };

  return (
    <FormControl error={form.hasError(name)} component="fieldset" fullWidth>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup
        id={id}
        value={form.getField(name) || null}
        onChange={handleChange}
        onClick={
          readonly ? (e: SyntheticEvent) => e.preventDefault() : undefined
        }
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.key}
            value={option.value}
            control={<Radio color={color} />}
            label={option.label}
            disabled={option?.disabled || false}
          />
        ))}
      </RadioGroup>
      {form.hasError(name) && (
        <FormHelperText error>{form.getHelperText(name)}</FormHelperText>
      )}
    </FormControl>
  );
}, propsEqual);
