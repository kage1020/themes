import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox, CheckboxGroup } from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = typeof meta;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Checkbox Label",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled Checkbox",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: "Checked Checkbox",
  },
};

export const WithHelpText: Story = {
  args: {
    label: "Checkbox with Help Text",
    help: "This is some helpful text.",
  },
};

export const WithError: Story = {
  args: {
    label: "Checkbox with Error",
    error: { type: "required", message: "This field is required." },
  },
};

export const WithHelpTextAndError: Story = {
  args: {
    label: "Checkbox with Help Text and Error",
    help: "This is some helpful text.",
    error: { type: "required", message: "This field is required." },
  },
};

export const Multiple: Story = {
  render: () => (
    <CheckboxGroup>
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" />
      <Checkbox label="Option 3" />
      <Checkbox label="Option 4" />
      <Checkbox label="Option 5" />
    </CheckboxGroup>
  ),
};

export const MultipleWithAtLeastTwoRequired: Story = {
  render: () => {
    const schema = z.object({
      name: z.array(z.string()).min(2, "Select at least two options"),
    });
    const {
      register,
      formState: { errors },
    } = useForm({
      mode: "onChange",
      resolver: zodResolver(schema),
    });

    return (
      <CheckboxGroup label="Select at least two options" error={errors.name}>
        <Checkbox label="Option 1" value="option1" {...register("name")} />
        <Checkbox label="Option 2" value="option2" {...register("name")} />
        <Checkbox label="Option 3" value="option3" {...register("name")} />
        <Checkbox label="Option 4" value="option4" {...register("name")} />
        <Checkbox label="Option 5" value="option5" {...register("name")} />
      </CheckboxGroup>
    );
  },
};

export const MultipleWithTextField: Story = {
  render: () => {
    const schema = z.object({
      name: z.array(z.string()),
      other: z.string().optional(),
    });
    const { register } = useForm({
      mode: "onChange",
      resolver: zodResolver(schema),
    });

    return (
      <CheckboxGroup>
        <Checkbox label="Option 1" value="option1" {...register("name")} />
        <Checkbox label="Option 2" value="option2" {...register("name")} />
        <Checkbox label="Option 3" value="option3" {...register("name")} />
        <Checkbox label="Option 4" value="option4" {...register("name")} />
        <Checkbox label="Option 5" value="option5" {...register("name")} />
        <Checkbox
          label="Other"
          value="other"
          free
          {...register("name")}
          slotProps={{
            textField: { ...register("other") },
          }}
        />
      </CheckboxGroup>
    );
  },
};
