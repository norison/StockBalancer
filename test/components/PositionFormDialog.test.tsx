import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import PositionFormDialog from "../../src/ui/components/PositionFormDialog.tsx";
import { Position } from "../../src/ui/types/Position.ts";

describe("PositionFormDialog", () => {
  const mockOnCancel = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onCancel: mockOnCancel,
    onSubmit: mockOnSubmit,
  };

  const renderComponent = (props = {}) =>
    render(<PositionFormDialog {...defaultProps} {...props} />);

  it("renders the dialog with default values", () => {
    renderComponent();
    expect(screen.getByLabelText(/Ticker/i)).toHaveValue("");
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue("");
    expect(screen.getByLabelText(/Price/i)).toHaveValue("");
    expect(screen.getByLabelText(/Target %/i)).toHaveValue("");
  });

  it("renders the dialog with provided position values", () => {
    const position: Position = {
      ticker: "AAPL",
      quantity: 10,
      price: 150,
      target: 50,
    };
    renderComponent({ position });

    expect(screen.getByLabelText(/Ticker/i)).toHaveValue("AAPL");
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue("10");
    expect(screen.getByLabelText(/Price/i)).toHaveValue("150");
    expect(screen.getByLabelText(/Target %/i)).toHaveValue("50");
  });

  it("calls onCancel when the cancel button is clicked", async () => {
    renderComponent();
    await userEvent.click(screen.getByText(/Cancel/i));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit with form data when the save button is clicked", async () => {
    renderComponent();
    await userEvent.type(screen.getByLabelText(/Ticker/i), "GOOGL");
    await userEvent.clear(screen.getByLabelText(/Quantity/i));
    await userEvent.type(screen.getByLabelText(/Quantity/i), "20");
    await userEvent.clear(screen.getByLabelText(/Price/i));
    await userEvent.type(screen.getByLabelText(/Price/i), "2000");
    await userEvent.clear(screen.getByLabelText(/Target %/i));
    await userEvent.type(screen.getByLabelText(/Target %/i), "30");

    await userEvent.click(screen.getByText(/Save/i));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      ticker: "GOOGL",
      quantity: 20,
      price: 2000,
      target: 30,
    });
  });

  it("shows validation errors for invalid input", async () => {
    renderComponent();
    await userEvent.clear(screen.getByLabelText(/Ticker/i));
    await userEvent.clear(screen.getByLabelText(/Quantity/i));
    await userEvent.type(screen.getByLabelText(/Quantity/i), "-1");
    await userEvent.clear(screen.getByLabelText(/Price/i));
    await userEvent.type(screen.getByLabelText(/Price/i), "-100");
    await userEvent.clear(screen.getByLabelText(/Target %/i));
    await userEvent.type(screen.getByLabelText(/Target %/i), "150");

    await userEvent.click(screen.getByText(/Save/i));

    expect(
      await screen.findByText(/ticker is a required field/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/quantity must be greater than or equal to 0/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/price must be a positive number/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/target must be less than or equal to 100/i),
    ).toBeInTheDocument();
  });
});
