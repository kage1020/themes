import type { Meta } from "@storybook/react";
import { Avatar } from "./index";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "The image source URL for the avatar.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    alt: {
      control: "text",
      description:
        "The alt text for the avatar image. Used for accessibility and as a fallback when no image is provided.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = typeof meta;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/300",
  },
};

export const WithImageNotFound: Story = {
  args: {
    src: "https://example.com",
  },
};

export const WithAltText: Story = {
  args: {
    alt: "John Doe",
  },
};

export const WithSurrogatePairText: Story = {
  args: {
    alt: "😀😀😀😀😀",
  },
};

export const WithJapaneseText: Story = {
  args: {
    alt: "山田太郎",
  },
};
