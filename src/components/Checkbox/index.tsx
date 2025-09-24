"use client";

import MuiCheckbox, {
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText, {
  type FormHelperTextProps,
} from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Merge,
  type Path,
  type PathValue,
} from "react-hook-form";

interface CheckboxGroupProps extends Omit<FormControlProps, "error"> {
  label?: string;
  help?: string;
  error?: Merge<FieldError, (FieldError | undefined)[]>;
}

export function CheckboxGroup({
  label,
  children,
  help,
  error,
  ...props
}: CheckboxGroupProps) {
  return (
    <FormControl {...props}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormGroup>{children}</FormGroup>
      {help && <FormHelperText>{help}</FormHelperText>}
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
}

interface CheckboxProps<T extends FieldValues>
  extends Omit<MuiCheckboxProps, "name" | "checked" | "slotProps"> {
  label?: string;
  control?: Control<T>;
  name?: Path<T>;
  checked?: PathValue<T, Path<T>>;
  free?: boolean;
  help?: string;
  error?: FieldError;
  slotProps?: MuiCheckboxProps["slotProps"] & {
    formControl?: Omit<FormControlProps, "children">;
    formControlLabel?: Omit<FormControlLabelProps, "control" | "label">;
    textField?: TextFieldProps;
    helpText?: Omit<FormHelperTextProps, "children" | "error">;
    errorText?: Omit<FormHelperTextProps, "children" | "error">;
  };
}

export function Checkbox<T extends FieldValues>({
  control,
  name,
  label,
  checked,
  ref,
  disabled,
  onChange,
  onBlur,
  free,
  slotProps,
  help,
  error,
  ...props
}: CheckboxProps<T>) {
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        defaultValue={checked}
        disabled={disabled}
        render={({ field }) => (
          <FormControl {...slotProps?.formControl}>
            <FormControlLabel
              sx={{
                display: "flex",
                alignItems: "center",
                ...slotProps?.formControlLabel?.sx,
              }}
              slotProps={{
                typography: (params) => ({
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    ...(typeof slotProps?.formControlLabel?.slotProps
                      ?.typography === "function"
                      ? slotProps.formControlLabel.slotProps.typography(params)
                      : slotProps?.formControlLabel?.slotProps?.typography
                    )?.sx,
                  },
                }),
                ...slotProps?.formControlLabel,
              }}
              control={
                <MuiCheckbox
                  {...props}
                  {...field}
                  slotProps={slotProps}
                  ref={(el) => {
                    field.ref(el);
                    if (typeof ref === "function") {
                      ref(el);
                    } else if (ref) {
                      ref.current = el;
                    }
                  }}
                  checked={field.value}
                  onChange={(e, checked) => {
                    field.onChange(checked);
                    onChange?.(e, checked);
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                    onBlur?.(e);
                  }}
                />
              }
              label={
                <>
                  {label}
                  {free && (
                    <TextField
                      slotProps={{
                        htmlInput: (params) => ({
                          sx: {
                            py: 1,
                            ...(typeof slotProps?.textField?.slotProps
                              ?.htmlInput === "function"
                              ? slotProps.textField.slotProps.htmlInput(params)
                              : slotProps?.textField?.slotProps?.htmlInput
                            )?.sx,
                          },
                        }),
                        ...slotProps?.textField?.slotProps,
                      }}
                      {...slotProps?.textField}
                    />
                  )}
                </>
              }
              {...slotProps?.formControlLabel}
            />
            {help && (
              <FormHelperText {...slotProps?.helpText}>{help}</FormHelperText>
            )}
            {error && (
              <FormHelperText error {...slotProps?.errorText}>
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    );
  }

  return (
    <FormControl {...slotProps?.formControl}>
      <FormControlLabel
        sx={{
          display: "flex",
          alignItems: "center",
          ...slotProps?.formControlLabel?.sx,
        }}
        slotProps={{
          typography: (params) => ({
            sx: {
              display: "flex",
              alignItems: "center",
              gap: 1,
              ...(typeof slotProps?.formControlLabel?.slotProps?.typography ===
              "function"
                ? slotProps.formControlLabel.slotProps.typography(params)
                : slotProps?.formControlLabel?.slotProps?.typography
              )?.sx,
            },
          }),
          ...slotProps?.formControlLabel,
        }}
        control={
          <MuiCheckbox
            ref={ref}
            name={name}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            slotProps={slotProps}
            {...props}
          />
        }
        label={
          <>
            {label}
            {free && (
              <TextField
                slotProps={{
                  htmlInput: (params) => ({
                    sx: {
                      py: 1,
                      ...(typeof slotProps?.textField?.slotProps?.htmlInput ===
                      "function"
                        ? slotProps.textField.slotProps.htmlInput(params)
                        : slotProps?.textField?.slotProps?.htmlInput
                      )?.sx,
                    },
                  }),
                  ...slotProps?.textField?.slotProps,
                }}
                {...slotProps?.textField}
              />
            )}
          </>
        }
        {...slotProps?.formControlLabel}
      />
      {help && <FormHelperText {...slotProps?.helpText}>{help}</FormHelperText>}
      {error && (
        <FormHelperText error {...slotProps?.errorText}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
