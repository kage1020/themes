import Box, { type BoxProps } from "@mui/material/Box";
import type { FilledInputProps } from "@mui/material/FilledInput";
import FilledInput from "@mui/material/FilledInput";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import FormHelperText, {
  type FormHelperTextProps,
} from "@mui/material/FormHelperText";
import MuiInput, {
  type InputProps as MuiInputProps,
} from "@mui/material/Input";
import OutlinedInput, {
  type OutlinedInputProps,
} from "@mui/material/OutlinedInput";
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

export type InputVariant = "standard" | "outlined" | "filled";

export type BaseInputProps<V extends InputVariant> = V extends "standard"
  ? Omit<MuiInputProps, "variant" | "name">
  : V extends "filled"
    ? Omit<FilledInputProps, "variant">
    : OutlinedInputProps;

export type InputProps<T extends FieldValues, V extends InputVariant> = Omit<
  BaseInputProps<V>,
  "name" | "slotProps" | "error"
> & {
  name?: Path<T>;
  control?: Control<T>;
  label?: string;
  variant?: V;
  help?: string;
  error?: FieldError;
  slotProps?: OutlinedInputProps["slotProps"] & {
    formControl?: Omit<FormControlProps, "children">;
    formLabel?: Omit<BoxProps, "children">;
    helpText?: Omit<FormHelperTextProps, "error" | "children">;
    errorText?: Omit<FormHelperTextProps, "error" | "children">;
  };
};

export function Input<
  T extends FieldValues,
  V extends InputVariant = InputVariant,
>({
  ref,
  name,
  control,
  label,
  variant = "outlined" as V,
  help,
  error,
  slotProps,
  ...props
}: InputProps<T, V>) {
  if (name && control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl {...slotProps?.formControl}>
            {label && <Box {...slotProps?.formLabel}>{label}</Box>}
            {variant === "outlined" && (
              <OutlinedInput
                {...props}
                {...field}
                ref={(el) => {
                  field.ref(el);
                  if (typeof ref === "function") {
                    ref(el);
                  } else if (ref) {
                    ref.current = el;
                  }
                }}
                slotProps={slotProps}
              />
            )}
            {variant === "standard" && (
              <MuiInput
                {...props}
                {...field}
                ref={(el) => {
                  field.ref(el);
                  if (typeof ref === "function") {
                    ref(el);
                  } else if (ref) {
                    ref.current = el;
                  }
                }}
                slotProps={slotProps}
              />
            )}
            {variant === "filled" && (
              <FilledInput
                {...props}
                {...field}
                ref={(el) => {
                  field.ref(el);
                  if (typeof ref === "function") {
                    ref(el);
                  } else if (ref) {
                    ref.current = el;
                  }
                }}
                slotProps={slotProps}
              />
            )}
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
      {label && <Box {...slotProps?.formLabel}>{label}</Box>}
      {variant === "outlined" && (
        <OutlinedInput ref={ref} slotProps={slotProps} {...props} />
      )}
      {variant === "standard" && <MuiInput {...props} slotProps={slotProps} />}
      {variant === "filled" && (
        <FilledInput
          {...props}
          slotProps={{
            input: {
              sx: {
                pt: 1,
                ...slotProps?.input?.sx,
              },
              ...slotProps?.input,
            },
            ...slotProps,
          }}
        />
      )}
      {help && <FormHelperText {...slotProps?.helpText}>{help}</FormHelperText>}
      {error && (
        <FormHelperText error {...slotProps?.errorText}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
