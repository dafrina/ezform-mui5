import React, { memo } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { FormControl, TextField } from "@mui/material";
import { FieldReadonly } from "./FieldReadonly";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export interface FieldDateProps extends FieldBaseProps {
  format: string;
  placeholder?: string;
  closeOnSelect?: boolean;
  disableToolbar?: boolean;
  variant?: "filled" | "outlined" | "standard";
  minDate?: any;
  maxDate?: any;
  disablePast?: boolean;
  disableFuture?: boolean;
  type?: "date" | "datetime" | "time";
}

export const FieldDate = memo((props: FieldDateProps) => {
  const {
    id,
    name,
    form,
    validator = () => null,
    disabled,
    label,
    format,
    closeOnSelect = true,
    variant = "standard",
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    type = "date",
    readonly = form.isReadonly,
    defaultValue,
    placeholder
  } = props;

  useField(name, validator, form, defaultValue);

  const handleChange = (date: any) => {
    form.setField(name, date?.unix() * 1000);
  };

  if (readonly) {
    return (
      <FieldReadonly
        variant={variant}
        name={name}
        id={id}
        label={label}
        value={moment(form.getField(name)).format(format)}
        fullWidth
      />
    );
  }

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <>
          {type === "date" && (
            <DatePicker
              closeOnSelect={closeOnSelect}
              disabled={disabled}
              inputFormat={format}
              label={label}
              value={form.getField(name) || null}
              onChange={handleChange}
              minDate={minDate}
              maxDate={maxDate}
              disablePast={disablePast}
              disableFuture={disableFuture}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  error={form.hasError(name)}
                  helperText={form.getHelperText(name)}
                  variant={variant}
                />
              )}
            />
          )}
          {type === "datetime" && (
            <DateTimePicker
              closeOnSelect={closeOnSelect}
              disabled={disabled}
              inputFormat={format}
              label={label}
              value={form.getField(name) || null}
              onChange={handleChange}
              minDate={minDate}
              maxDate={maxDate}
              disablePast={disablePast}
              disableFuture={disableFuture}
              ampm={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  error={form.hasError(name)}
                  helperText={form.getHelperText(name)}
                  variant={variant}
                />
              )}
            />
          )}
          {type === "time" && (
            <TimePicker
              closeOnSelect={closeOnSelect}
              disabled={disabled}
              inputFormat={format}
              label={label}
              value={form.getField(name) || null}
              onChange={handleChange}
              ampm={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  error={form.hasError(name)}
                  helperText={form.getHelperText(name)}
                  variant={variant}
                />
              )}
            />
          )}
        </>
      </LocalizationProvider>
    </FormControl>
  );
}, propsEqual);
