"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import FormHelperText, {
  type FormHelperTextProps,
} from "@mui/material/FormHelperText";
import {
  DatePicker,
  type DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

export interface DateInputProps<T extends FieldValues>
  extends Omit<DatePickerProps, "name" | "slotProps"> {
  ref?: React.Ref<HTMLDivElement>;
  name?: Path<T>;
  control?: Control<T>;
  label?: string;
  error?: FieldError;
  slotProps?: DatePickerProps["slotProps"] & {
    formControl?: Omit<FormControlProps, "children">;
    formLabel?: Omit<BoxProps, "children">;
    errorText?: Omit<FormHelperTextProps, "error" | "children">;
  };
}

export function DateInput<T extends FieldValues>({
  ref,
  name,
  control,
  label,
  error,
  slotProps,
  ...props
}: DateInputProps<T>) {
  const [open, setOpen] = useState(false);

  if (name && control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl {...slotProps?.formControl}>
            {label && <Box {...slotProps?.formLabel}>{label}</Box>}
            <DatePicker
              {...props}
              {...field}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              onAccept={() => setOpen(false)}
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
      <DatePicker
        showDaysOutsideCurrentMonth
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onAccept={() => setOpen(false)}
        slotProps={slotProps}
        {...props}
      />
      {error && (
        <FormHelperText error {...slotProps?.errorText}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
