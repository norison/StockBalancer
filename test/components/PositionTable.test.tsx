import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PositionTable from "../../src/ui/components/PositionTable";
import { vi } from "vitest";
import { renderWithProviders } from "../utils.tsx";

const openEditDialogMock = vi.fn();
const removePositionMock = vi.fn();

const positionsMock = vi.fn(() => [
  { ticker: "AAPL", quantity: 10, price: 150, target: 50 },
  { ticker: "GOOGL", quantity: 5, price: 2500, target: 50 },
]);

vi.mock("../../src/ui/stores/PortfolioStore.ts", async () => {
  const actual = await vi.importActual("../../src/ui/stores/PortfolioStore.ts");

  return {
    ...actual,
    usePortfolio: () => ({
      get positions() {
        return positionsMock();
      },
      openEditDialog: openEditDialogMock,
      removePosition: removePositionMock,
    }),
  };
});

describe("PositionTable", () => {
  it("renders positions correctly", () => {
    renderWithProviders(<PositionTable />);
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("GOOGL")).toBeInTheDocument();
  });

  it("when clicking edit button calls correct store methods", async () => {
    renderWithProviders(<PositionTable />);
    const buttons = screen.getAllByTestId<HTMLButtonElement>(
      "PositionTableEditButton",
    );

    await userEvent.click(buttons[0]);
    expect(openEditDialogMock).toHaveBeenCalled();
  });

  it("when clicking delete button calls correct store methods", async () => {
    renderWithProviders(<PositionTable />);
    const buttons = screen.getAllByTestId<HTMLButtonElement>(
      "PositionTableDeleteButton",
    );
    await userEvent.click(buttons[0]);
    expect(removePositionMock).toHaveBeenCalled();
  });

  it('displays "No positions" message when positions array is empty', () => {
    positionsMock.mockReturnValue([]);
    renderWithProviders(<PositionTable />);
    expect(screen.getByText("No positions")).toBeInTheDocument();
  });
});
