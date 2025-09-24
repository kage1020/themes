import type { Meta } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "outlined", "contained"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "warning", "info", "success"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = typeof meta;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "contained",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "outlined",
  },
};

export const Text: Story = {
  args: {
    children: "Button",
    variant: "text",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    children: "Error Button",
    color: "error",
    variant: "contained",
  },
};

export const WithSuccess: Story = {
  args: {
    children: "Success Button",
    color: "success",
    variant: "contained",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    loading: true,
    variant: "contained",
  },
};

export const LoadingWithInterval: Story = {
  args: {
    children: "Loading Button",
    loadingInterval: 2000,
    variant: "contained",
  },
};

export const LoadingWithReturnTrue: Story = {
  args: {
    children: "Loading Button",
    loadingInterval: 10000,
    variant: "contained",
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return true;
    },
  },
};
