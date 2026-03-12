import Box, { type BoxProps } from "@mui/material/Box";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import FormHelperText, {
  type FormHelperTextProps,
} from "@mui/material/FormHelperText";
import FormLabel, { type FormLabelProps } from "@mui/material/FormLabel";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useRef, useState } from "react";
import type {
  FieldError,
  FieldValue,
  FieldValues,
  Path,
} from "react-hook-form";

export type InputOTPProps<T extends FieldValues> = Omit<
  BoxProps,
  "slotProps" | "onChange" | "onKeyDown" | "onPaste"
> & {
  length: number;
  label?: string;
  name?: Path<T>;
  value?: FieldValue<T>;
  required?: boolean;
  onChange?: (value: FieldValue<T>) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLDivElement>) => void;
  help?: string;
  error?: FieldError;
  slotProps?: OutlinedInputProps["slotProps"] & {
    formLabel?: Omit<FormLabelProps, "children">;
    formControl?: Omit<FormControlProps, "children">;
    otpContainer?: Omit<BoxProps, "children" | "ref">;
    outlinedInputs?: OutlinedInputProps[];
    helpText?: Omit<FormHelperTextProps, "error" | "children">;
    errorText?: Omit<FormHelperTextProps, "error" | "children">;
  };
};

export function InputOTP<T extends FieldValues>({
  sx,
  label,
  length,
  required = false,
  slotProps,
  ref,
  name,
  value,
  help,
  error,
  onChange,
  onKeyDown,
  onPaste,
  ...props
}: InputOTPProps<T>) {
  const [values, setValues] = useState<string[]>(
    value ? value.split("") : Array(length).fill(""),
  );
  const inputRefs = Array.from({ length })
    .fill(0)
    .map(() => useRef<HTMLInputElement>(null));

  const handleChange = (i: number, v: string) => {
    const newValues = [...values.slice(0, i), v, ...values.slice(i + 1)];
    onChange?.(newValues.join("") as FieldValue<T>);
    setValues(newValues);

    if (v && i < length - 1) {
      inputRefs[i + 1]?.current?.focus();
      setTimeout(() => inputRefs[i + 1]?.current?.select(), 0);
    }
  };

  const handleKeydown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onKeyDown?.(e);
    if (e.key === "ArrowLeft" && i > 0) {
      inputRefs[i - 1]?.current?.focus();
      setTimeout(() => inputRefs[i - 1]?.current?.select(), 0);
    } else if (e.key === "ArrowRight" && i < length - 1) {
      inputRefs[i + 1]?.current?.focus();
      setTimeout(() => inputRefs[i + 1]?.current?.select(), 0);
    }
  };

  const handlePaste = (i: number, e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    onPaste?.(e);
    const data = e.clipboardData.getData("text").trim();
    const newValues = [
      ...values.slice(0, i),
      ...data.slice(0, length - i).split(""),
      ...values.slice(i + data.length),
    ];
    setValues(newValues);
    onChange?.(newValues.join("") as FieldValue<T>);

    if (i + data.length < length) {
      inputRefs[i + data.length]?.current?.focus();
      setTimeout(() => inputRefs[i + data.length]?.current?.select(), 0);
    } else {
      inputRefs[length - 1]?.current?.focus();
    }
  };

  return (
    <Box sx={sx} {...props}>
      {label && <FormLabel {...slotProps?.formLabel}>{label}</FormLabel>}
      <Box
        ref={ref}
        {...slotProps?.otpContainer}
        sx={{
          display: "flex",
          justifyContent: "center",
          ...slotProps?.otpContainer?.sx,
        }}
      >
        {inputRefs.map((inputRef, i) => (
          <FormControl {...slotProps?.formControl} key={i}>
            <OutlinedInput
              ref={inputRef}
              {...slotProps?.outlinedInputs?.[i]}
              sx={{
                width: "3rem",
                height: "3rem",
                borderTopRightRadius: i === inputRefs.length - 1 ? "4px" : 0,
                borderBottomRightRadius: i === inputRefs.length - 1 ? "4px" : 0,
                borderTopLeftRadius: i === 0 ? "4px" : 0,
                borderBottomLeftRadius: i === 0 ? "4px" : 0,
                borderRightStyle: i === inputRefs.length - 1 ? "solid" : "none",
                boxSizing: "content-box",
                ...slotProps?.outlinedInputs?.[i]?.sx,
              }}
              autoComplete="one-time-code"
              required={required}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  textTransform: "uppercase",
                  ...slotProps?.outlinedInputs?.[i]?.inputProps?.style,
                },
                ...slotProps?.outlinedInputs?.[i]?.inputProps,
              }}
              name={`${name}.${i}`}
              value={values[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeydown(i, e)}
              onPaste={(e) => handlePaste(i, e)}
            />
          </FormControl>
        ))}
      </Box>
      {help && (
        <FormHelperText
          {...slotProps?.helpText}
          sx={{ ml: 0, ...slotProps?.helpText?.sx }}
        >
          {help}
        </FormHelperText>
      )}
      {error && (
        <FormHelperText
          error
          sx={{ ml: 0, ...slotProps?.errorText?.sx }}
          {...slotProps?.errorText}
        >
          {error.message}
        </FormHelperText>
      )}
    </Box>
  );
}
