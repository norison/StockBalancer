import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../utils.tsx";
import PositionFormDialog from "../../src/ui/components/PositionFormDialog.tsx";
import { expect } from "vitest";

const currentPositionMock = vi.fn();
const cancelDialogMock = vi.fn();
const addPositionMock = vi.fn();
const editPositionMock = vi.fn();

vi.mock("../../src/ui/container/container.ts", async () => {
  const actual = await vi.importActual("../../src/ui/container/container.ts");

  return {
    ...actual,
    usePortfolioStore: () => ({
      dialogOpen: true,
      get currentPosition() {
        return currentPositionMock();
      },
      cancelDialog: cancelDialogMock,
      addPosition: addPositionMock,
      editPosition: editPositionMock,
    }),
  };
});

describe("PositionFormDialog", () => {
  it("renders the dialog with default values", () => {
    renderWithProviders(<PositionFormDialog />);
    expect(screen.getByLabelText(/Ticker/i)).toHaveValue("");
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue("");
    expect(screen.getByLabelText(/Price/i)).toHaveValue("");
    expect(screen.getByLabelText(/Target %/i)).toHaveValue("");
  });

  it("renders the dialog with provided position values", () => {
    currentPositionMock.mockReturnValue({
      ticker: "AAPL",
      quantity: 10,
      price: 150,
      target: 50,
    });
    renderWithProviders(<PositionFormDialog />);
    expect(screen.getByLabelText(/Ticker/i)).toHaveValue("AAPL");
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue("10");
    expect(screen.getByLabelText(/Price/i)).toHaveValue("150");
    expect(screen.getByLabelText(/Target %/i)).toHaveValue("50");
  });

  it("calls onCancel when the cancel button is clicked", async () => {
    renderWithProviders(<PositionFormDialog />);
    await userEvent.click(screen.getByText(/Cancel/i));
    expect(cancelDialogMock).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when press escape button", async () => {
    renderWithProviders(<PositionFormDialog />);
    await userEvent.keyboard("{Escape}");
    expect(cancelDialogMock).toHaveBeenCalledTimes(1);
  });

  // it("when not current position then calls add position", async () => {
  //   currentPositionMock.mockReturnValue(null);
  //   renderWithProviders(<PositionFormDialog />);
  //   await userEvent.type(screen.getByLabelText(/Ticker/i), "GOOGL");
  //   await userEvent.type(screen.getByLabelText(/Quantity/i), "20");
  //   await userEvent.type(screen.getByLabelText(/Price/i), "2000");
  //   await userEvent.type(screen.getByLabelText(/Target %/i), "30");
  //
  //   await userEvent.click(screen.getByText(/Save/i));
  //
  //   expect(addPositionMock).toHaveBeenCalled();
  // });

  it("when with current position then calls edit position", async () => {
    currentPositionMock.mockReturnValue({
      ticker: "AAPL",
      quantity: 10,
      price: 150,
      target: 50,
    });
    renderWithProviders(<PositionFormDialog />);
    await userEvent.clear(screen.getByLabelText(/Quantity/i));
    await userEvent.type(screen.getByLabelText(/Quantity/i), "20");
    await userEvent.clear(screen.getByLabelText(/Price/i));
    await userEvent.type(screen.getByLabelText(/Price/i), "2000");
    await userEvent.clear(screen.getByLabelText(/Target %/i));
    await userEvent.type(screen.getByLabelText(/Target %/i), "30");

    await userEvent.click(screen.getByText(/Save/i));

    expect(screen.getByLabelText(/Ticker/i)).toBeDisabled();
    expect(editPositionMock).toHaveBeenCalled();
  });

  it("shows validation errors for invalid input", async () => {
    renderWithProviders(<PositionFormDialog />);
    await userEvent.clear(screen.getByLabelText(/Quantity/i));
    await userEvent.type(screen.getByLabelText(/Quantity/i), "-1");
    await userEvent.clear(screen.getByLabelText(/Price/i));
    await userEvent.type(screen.getByLabelText(/Price/i), "-100");
    await userEvent.clear(screen.getByLabelText(/Target %/i));
    await userEvent.type(screen.getByLabelText(/Target %/i), "150");

    await userEvent.click(screen.getByText(/Save/i));

    expect(screen.getByLabelText(/Ticker/i)).toBeDisabled();
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
