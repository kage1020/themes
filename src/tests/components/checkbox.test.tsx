import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type Control, useForm } from "react-hook-form";
import { expect, vi } from "vitest";
import { Checkbox, CheckboxGroup } from "../../components/Checkbox";

function TestForm({
  children,
}: {
  children: ({ control }: { control: Control }) => React.ReactNode;
}) {
  const methods = useForm();
  return <form>{children(methods)}</form>;
}

describe("Checkbox", () => {
  describe("Basic functionality", () => {
    it("should render checkbox with label", () => {
      render(<Checkbox label="Test Label" />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("should handle checked state", () => {
      render(<Checkbox label="Test" checked />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it("should handle click events", async () => {
      const handleChange = vi.fn();
      render(<Checkbox label="Test" onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      await userEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("React Hook Form integration", () => {
    it("should work with react-hook-form", () => {
      render(
        <TestForm>
          {({ control }) => (
            <Checkbox control={control} name="testField" label="Test" />
          )}
        </TestForm>,
      );

      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });
  });

  describe("Free text input", () => {
    it("should render text field when free is true", () => {
      render(<Checkbox label="Other" free />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  describe("Error and help text", () => {
    it("should display error message", () => {
      const error = { type: "required", message: "This field is required" };
      render(<Checkbox label="Test" error={error} />);

      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("should display help text", () => {
      render(<Checkbox label="Test" help="Help message" />);

      expect(screen.getByText("Help message")).toBeInTheDocument();
    });
  });

  describe("SlotProps", () => {
    it("should apply slotProps to FormControl", () => {
      render(
        <Checkbox
          label="Test"
          slotProps={{ formControl: { "data-testid": "form-control" } }}
        />,
      );

      expect(screen.getByTestId("form-control")).toBeInTheDocument();
    });

    it("should apply slotProps to FormControl with react-hook-form", () => {
      render(
        <TestForm>
          {({ control }) => (
            <Checkbox
              control={control}
              name="testField"
              label="Test"
              slotProps={{ formControl: { "data-testid": "form-control" } }}
            />
          )}
        </TestForm>,
      );

      expect(screen.getByTestId("form-control")).toBeInTheDocument();
    });

    it("should apply slotProps to FormControlLabel", () => {
      render(
        <Checkbox
          label="Test"
          slotProps={{
            formControlLabel: { "data-testid": "form-control-label" },
          }}
        />,
      );

      expect(screen.getByTestId("form-control-label")).toBeInTheDocument();
    });

    it("should apply slotProps to FormControlLabel with react-hook-form", () => {
      render(
        <TestForm>
          {({ control }) => (
            <Checkbox
              control={control}
              name="testField"
              label="Test"
              slotProps={{
                formControlLabel: { "data-testid": "form-control-label" },
              }}
            />
          )}
        </TestForm>,
      );

      expect(screen.getByTestId("form-control-label")).toBeInTheDocument();
    });

    it("should apply slotProps to FormControlLabel typography object", () => {
      render(
        <Checkbox
          label="Test"
          slotProps={{
            formControlLabel: {
              slotProps: { typography: { "data-testid": "typography" } },
            },
          }}
        />,
      );

      expect(screen.getByTestId("typography")).toBeInTheDocument();
    });

    it("should apply slotProps to FormControlLabel typography object with react-hook-form", () => {
      render(
        <TestForm>
          {({ control }) => (
            <Checkbox
              control={control}
              name="testField"
              label="Test"
              slotProps={{
                formControlLabel: {
                  slotProps: { typography: { "data-testid": "typography" } },
                },
              }}
            />
          )}
        </TestForm>,
      );

      expect(screen.getByTestId("typography")).toBeInTheDocument();
    });

    it("should apply slotProps to FormControlLabel typography function", () => {
      render(
        <Checkbox
          label="Test"
          slotProps={{
            formControlLabel: {
              slotProps: {
                typography: () => ({ "data-testid": "typography-fn" }),
              },
            },
          }}
        />,
      );

      expect(screen.getByTestId("typography-fn")).toBeInTheDocument();
    });

    it("should apply slotProps to FormControlLabel typography function with react-hook-form", () => {
      render(
        <TestForm>
          {({ control }) => (
            <Checkbox
              control={control}
              name="testField"
              label="Test"
              slotProps={{
                formControlLabel: {
                  slotProps: {
                    typography: () => ({ "data-testid": "typography-fn" }),
                  },
                },
              }}
            />
          )}
        </TestForm>,
      );

      // expect(screen.getByTestId("typography-fn")).toBeInTheDocument();
    });

    it("should apply slotProps to TextField with react-hook-form", () => {
      render(
        <TestForm>
          {({ control }) => (
            <Checkbox
              control={control}
              name="testField"
              label="Test"
              free
              slotProps={{ textField: { "data-testid": "text-field" } }}
            />
          )}
        </TestForm>,
      );

      expect(screen.getByTestId("text-field")).toBeInTheDocument();
    });

    it("should apply slotProps to TextField", () => {
      render(
        <Checkbox
          label="Test"
          free
          slotProps={{ textField: { "data-testid": "text-field" } }}
        />,
      );

      expect(screen.getByTestId("text-field")).toBeInTheDocument();
    });

    it("should apply slotProps to help text with react-hook-form", () => {
      render(
        <TestForm>
          {({ control }) => (
            <Checkbox
              control={control}
              name="testField"
              label="Test"
              help="Help message"
              slotProps={{ helpText: { "data-testid": "help-text" } }}
            />
          )}
        </TestForm>,
      );

      expect(screen.getByTestId("help-text")).toBeInTheDocument();
    });

    it("should apply slotProps to help text", () => {
      render(
        <Checkbox
          label="Test"
          help="Help message"
          slotProps={{ helpText: { "data-testid": "help-text" } }}
        />,
      );

      expect(screen.getByTestId("help-text")).toBeInTheDocument();
    });

    it("should apply slotProps to error text with react-hook-form", () => {
      const error = { type: "required", message: "This field is required" };
      render(
        <TestForm>
          {({ control }) => (
            <Checkbox
              control={control}
              name="testField"
              label="Test"
              error={error}
              slotProps={{ errorText: { "data-testid": "error-text" } }}
            />
          )}
        </TestForm>,
      );

      expect(screen.getByTestId("error-text")).toBeInTheDocument();
    });

    it("should apply slotProps to error text", () => {
      const error = { type: "required", message: "This field is required" };
      render(
        <Checkbox
          label="Test"
          error={error}
          slotProps={{ errorText: { "data-testid": "error-text" } }}
        />,
      );

      expect(screen.getByTestId("error-text")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle disabled state", () => {
      render(<Checkbox label="Test" disabled />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
    });

    it("should handle ref prop", () => {
      const ref = { current: null };
      render(<Checkbox label="Test" ref={ref} />);
      expect(ref.current).toBeTruthy();
    });

    it("should handle onBlur event", async () => {
      const handleBlur = vi.fn();
      render(<Checkbox label="Test" onBlur={handleBlur} />);

      const checkbox = screen.getByRole("checkbox");
      await userEvent.click(checkbox);
      await userEvent.tab();

      expect(handleBlur).toHaveBeenCalled();
    });

    it("should handle indeterminate state", () => {
      render(<Checkbox label="Test" indeterminate />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("should handle all form states", () => {
      const error = { type: "required", message: "Required" };
      render(
        <Checkbox
          label="Test"
          help="Help text"
          error={error}
          disabled={false}
          checked={false}
        />,
      );

      expect(screen.getByText("Help text")).toBeInTheDocument();
      expect(screen.getByText("Required")).toBeInTheDocument();
    });
  });
});

describe("CheckboxGroup", () => {
  it("should render without props", () => {
    render(
      <CheckboxGroup>
        <Checkbox label="Option 1" />
      </CheckboxGroup>,
    );

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("should render with label", () => {
    render(
      <CheckboxGroup label="Options">
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
      </CheckboxGroup>,
    );

    expect(screen.getByText("Options")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });

  it("should render with help text", () => {
    render(
      <CheckboxGroup help="Select all that apply">
        <Checkbox label="Option 1" />
      </CheckboxGroup>,
    );

    expect(screen.getByText("Select all that apply")).toBeInTheDocument();
  });

  it("should handle error state", () => {
    const error = { type: "required", message: "Select at least one" };
    render(
      <CheckboxGroup error={error}>
        <Checkbox label="Option 1" />
      </CheckboxGroup>,
    );

    expect(screen.getByText("Select at least one")).toBeInTheDocument();
  });

  it("should show both help and error", () => {
    const error = { type: "required", message: "Error message" };
    render(
      <CheckboxGroup help="Help text" error={error}>
        <Checkbox label="Option 1" />
      </CheckboxGroup>,
    );

    expect(screen.getByText("Help text")).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("should pass through additional props", () => {
    render(
      <CheckboxGroup data-testid="checkbox-group" variant="outlined">
        <Checkbox label="Option 1" />
      </CheckboxGroup>,
    );

    expect(screen.getByTestId("checkbox-group")).toBeInTheDocument();
  });
});
