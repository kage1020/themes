import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "../../components/Avatar";

describe("Avatar", () => {
  describe("Basic rendering", () => {
    it("should render without props", () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
    });

    it("should render with image source", () => {
      render(<Avatar src="/test-image.jpg" alt="Test Avatar" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src", "/test-image.jpg");
      expect(avatar).toHaveAttribute("alt", "Test Avatar");
    });

    it("should render with text fallback when no src provided", () => {
      render(<Avatar alt="John Doe" />);
      const text = screen.getByText("John Doe");
      expect(text).toBeInTheDocument();
    });
  });

  describe("Color generation", () => {
    it("should generate background color from alt text", () => {
      render(<Avatar alt="Test User" data-testid="avatar" />);
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByTestId("avatar")).toHaveStyle({
        backgroundColor: "#993695",
        color: "#ffffff",
      });
    });

    it("should handle image src", () => {
      render(<Avatar src="/test.jpg" alt="Test User" data-testid="avatar" />);
      const avatar = screen.getByTestId("avatar");
      const img = avatar.querySelector("img");
      expect(img).toHaveAttribute("src", "/test.jpg");
    });
  });

  describe("Typography styling", () => {
    it("should render text fallback when no src", () => {
      render(<Avatar alt="Test" />);
      const text = screen.getByText("Test");
      expect(text).toBeInTheDocument();
    });
  });

  describe("Data attributes", () => {
    it("should pass through data attributes", () => {
      render(
        <Avatar
          alt="Test"
          data-testid="custom-avatar"
          data-custom="test-value"
        />,
      );
      const avatar = screen.getByTestId("custom-avatar");
      expect(avatar).toHaveAttribute("data-custom", "test-value");
    });
  });

  describe("MUI props forwarding", () => {
    it("should forward MUI Avatar props", () => {
      render(<Avatar alt="Test" variant="square" data-testid="avatar" />);
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar.className).toContain("MuiAvatar-square");
    });

    it("should forward sx prop", () => {
      render(
        <Avatar
          alt="Test"
          sx={{ width: 100, height: 100 }}
          data-testid="avatar"
        />,
      );
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveStyle({ width: "100px", height: "100px" });
    });

    it("should forward slotProps to inner components", () => {
      render(
        <Avatar
          alt="Test"
          slotProps={{
            typography: { color: "red", fontSize: 20 },
          }}
        />,
      );
      const text = screen.getByText("Test");
      expect(text).toHaveStyle({ color: "rgb(255, 0, 0)", fontSize: "20px" });
    });
  });

  describe("Edge cases", () => {
    it("should handle empty alt text", () => {
      render(<Avatar alt="" data-testid="avatar" />);
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar.querySelector("svg")).toBeInTheDocument();
    });

    it("should handle undefined alt", () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar.className).toContain("MuiAvatar");
    });

    it("should handle very long alt text", () => {
      const longText =
        "This is a very long name that should be handled properly";
      render(<Avatar alt={longText} />);
      const text = screen.getByText(longText);
      expect(text).toBeInTheDocument();
    });
  });
});
