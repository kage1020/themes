import Button, { type ButtonProps } from "@mui/material/Button";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormHelperText, {
  type FormHelperTextProps,
} from "@mui/material/FormHelperText";
import type { FormLabelProps } from "@mui/material/FormLabel";
import FormLabel from "@mui/material/FormLabel";
import MUIRadio from "@mui/material/Radio";
import type { RadioGroupProps } from "@mui/material/RadioGroup";
import RadioGroup from "@mui/material/RadioGroup";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import type { FieldError } from "react-hook-form";

export type RadioVariant = "contained" | "standard";

export type RadioProps<V extends RadioVariant = "standard"> = Omit<
  RadioGroupProps,
  "slotProps"
> & {
  label?: string;
  required?: boolean;
  variant?: V;
  options: { label: string; value: string }[];
  fullWidth?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  slotProps?: {
    formControl?: Omit<FormControlProps, "children">;
    formLabel?: Omit<FormLabelProps, "children">;
    formControlLabel?: Omit<
      FormControlLabelProps,
      "control" | "label" | "slots"
    >;
    formControlLabelTypography?: V extends "standard"
      ? Omit<TypographyProps, "children">
      : Omit<ButtonProps, "children">;
    helpText?: Omit<FormHelperTextProps, "error" | "children">;
    errorText?: Omit<FormHelperTextProps, "error" | "children">;
  };
  help?: string;
  error?: FieldError;
};

export function Radio<V extends RadioVariant = "standard">({
  sx,
  label,
  required,
  variant = "standard" as V,
  options,
  fullWidth = false,
  inputRef,
  onChange,
  slotProps,
  help,
  error,
  ...props
}: RadioProps<V>) {
  return (
    <FormControl sx={{ width: "100%", ...slotProps?.formControl?.sx }}>
      <FormLabel required={required} {...slotProps?.formLabel}>
        {label}
      </FormLabel>
      <RadioGroup
        sx={{
          gap: 1,
          flexWrap: "nowrap",
          py: variant === "contained" ? 1 : 0,
          ...sx,
        }}
        {...props}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            {...slotProps?.formControlLabel}
            sx={{
              width: fullWidth ? "100%" : "auto",
              m: 0,
              ...slotProps?.formControlLabel?.sx,
            }}
            slots={{
              typography: ({ children, ...typographyProps }) => {
                return variant === "contained" ? (
                  <Button
                    className={typographyProps.className}
                    component={typographyProps.component}
                    variant="outlined"
                    sx={{ textTransform: "unset", width: "100%" }}
                    tabIndex={-1}
                  >
                    {children}
                  </Button>
                ) : (
                  <Typography
                    {...typographyProps}
                    {...slotProps?.formControlLabelTypography}
                  >
                    {children}
                  </Typography>
                );
              },
            }}
            control={
              <MUIRadio
                sx={(theme) =>
                  variant === "contained"
                    ? {
                        position: "absolute",
                        width: 0,
                        height: 0,
                        padding: 0,
                        margin: 0,
                        overflow: "hidden",
                        clip: "rect(0 0 0 0)",
                        whiteSpace: "nowrap",
                        border: 0,
                        "&.Mui-checked + .MuiFormControlLabel-label": {
                          color: theme.palette.primary.contrastText,
                          backgroundColor: theme.palette.primary.main,
                        },
                        "&.Mui-focusVisible + .MuiFormControlLabel-label": {
                          outlineColor: theme.palette.primary.main,
                          outlineWidth: 1,
                          outlineStyle: "auto",
                        },
                      }
                    : {}
                }
                onChange={(e) => onChange?.(e, option.value)}
                slotProps={{
                  input: {
                    ref: inputRef,
                  },
                }}
              />
            }
            label={label}
          />
        ))}
      </RadioGroup>
      {help && (
        <FormHelperText
          sx={{ ml: 0, ...slotProps?.helpText?.sx }}
          {...slotProps?.helpText}
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
    </FormControl>
  );
}
