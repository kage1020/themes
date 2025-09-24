import type { Meta } from "@storybook/react";
import { Input } from "./index";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = typeof meta;

export const Default: Story = {};

export const Standard: Story = {
  args: {
    variant: "standard",
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
  },
};

export const WithHelpText: Story = {
  args: {
    label: "Username",
    help: "Enter your username.",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    error: { type: "required", message: "This field is required." },
  },
};

export const WithHelpTextAndErrorText: Story = {
  args: {
    label: "Username",
    help: "Enter your username.",
    error: { type: "required", message: "This field is required." },
  },
};
