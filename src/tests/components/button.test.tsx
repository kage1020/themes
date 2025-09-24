import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../components/Button";

describe("Button", () => {
  describe("Basic rendering", () => {
    it("should render without props", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: "Click me" });
      expect(button).toBeInTheDocument();
    });

    it("should forward MUI Button props", () => {
      render(
        <Button variant="outlined" color="secondary" data-testid="button">
          Test
        </Button>,
      );
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button.className).toContain("MuiButton");
    });
  });

  describe("Click handling", () => {
    it("should pass event to onClick handler", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
      expect(handleClick.mock.calls[0][0]).toHaveProperty("type", "click");
    });

    it("should handle async onClick", async () => {
      const user = userEvent.setup();
      const asyncHandler = vi.fn().mockResolvedValue(undefined);
      render(<Button onClick={asyncHandler}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(asyncHandler).toHaveBeenCalledTimes(1);
      });
    });

    it("should handle sync onClick returning truthy value", async () => {
      const user = userEvent.setup();
      const syncHandler = vi.fn().mockReturnValue(true);
      render(<Button onClick={syncHandler}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(syncHandler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Loading state", () => {
    it("should show loading state when loading prop is true", () => {
      render(<Button loading={true}>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button.className).toContain("MuiButton-loading");
    });

    it("should not show loading state when loading prop is false", () => {
      render(<Button loading={false}>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
      expect(button.className).not.toContain("MuiButton-loading");
    });

    it("should handle loadingInterval behavior", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} loadingInterval={50}>
          Click me
        </Button>,
      );

      const button = screen.getByRole("button");

      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);

      await waitFor(
        () => {
          expect(button).not.toBeDisabled();
        },
        { timeout: 200 },
      );
    });
  });

  describe("Loading interval behavior", () => {
    it("should not enable loading when loadingInterval is 0", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} loadingInterval={0}>
          Click me
        </Button>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(button).not.toBeDisabled();
    });

    it("should use default loadingInterval of 0", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(button).not.toBeDisabled();
    });
  });

  describe("Loading prop updates", () => {
    it("should update loading state when loading prop changes", () => {
      const { rerender } = render(<Button loading={false}>Click me</Button>);
      const button = screen.getByRole("button");

      expect(button).not.toBeDisabled();

      rerender(<Button loading={true}>Click me</Button>);
      expect(button).toBeDisabled();

      rerender(<Button loading={false}>Click me</Button>);
      expect(button).not.toBeDisabled();
    });
  });

  describe("Data attributes", () => {
    it("should pass through data attributes", () => {
      render(
        <Button data-testid="custom-button" data-custom="test-value">
          Test
        </Button>,
      );
      const button = screen.getByTestId("custom-button");
      expect(button).toHaveAttribute("data-custom", "test-value");
    });
  });

  describe("Accessibility", () => {
    it("should be accessible with proper role", () => {
      render(<Button>Accessible Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should handle disabled state", () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      await expect(user.click(button)).rejects.toThrow();

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Edge cases", () => {
    it("should handle onClick being undefined", async () => {
      const user = userEvent.setup();
      render(<Button>No onClick</Button>);
      const button = screen.getByRole("button");

      await expect(user.click(button)).resolves.not.toThrow();
    });

    it("should handle multiple rapid clicks", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it("should cleanup timers on unmount", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { unmount } = render(
        <Button onClick={handleClick} loadingInterval={1000}>
          Click me
        </Button>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      unmount();

      await new Promise((resolve) => setTimeout(resolve, 100));
    });
  });
});
