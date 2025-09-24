import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { jaJP } from "@mui/x-date-pickers/locales";
import type { Meta } from "@storybook/react";
import { DateInput } from "./index";

const meta: Meta<typeof DateInput> = {
  title: "Components/DateInput",
  component: DateInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = typeof meta;

const theme = createTheme({}, jaJP);

export const Default: Story = {
  render: () => (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateInput />
      </LocalizationProvider>
    </ThemeProvider>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateInput label="Select Date" />
      </LocalizationProvider>
    </ThemeProvider>
  ),
};

export const WithFormattedDate: Story = {
  render: () => (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateInput
          format="yyyy/MM/dd"
          slotProps={{
            calendarHeader: {
              format: "yyyy/MM",
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  ),
};

export const WithHelpText: Story = {
  render: () => (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateInput
          slotProps={{
            textField: {
              helperText: "Please select a date",
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  ),
};

export const WithErrorText: Story = {
  render: () => (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateInput
          error={{
            type: "required",
            message: "This field is required",
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  ),
};

export const WithHelpTextAndErrorText: Story = {
  render: () => (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateInput
          slotProps={{
            textField: {
              helperText: "Please select a date",
            },
          }}
          error={{
            type: "required",
            message: "This field is required",
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  ),
};
