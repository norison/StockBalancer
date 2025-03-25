import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Balance from "../../src/ui/components/Balance";
import { renderWithProviders } from "../utils.tsx";
import { expect } from "vitest";

let balance = 10.4;

vi.mock("../../src/ui/container/container.ts", async () => {
  const actual = await vi.importActual("../../src/ui/container/container.ts");

  return {
    ...actual,
    usePortfolio: () => ({
      get balance() {
        return balance;
      },
      set balance(value: number) {
        balance = value;
      },
    }),
  };
});

describe("Balance", () => {
  it("renders balance correctly", () => {
    renderWithProviders(<Balance />);
    expect(
      screen.getByText(`Current Balance: $${balance.toFixed(2)}`),
    ).toBeInTheDocument();
  });

  it("enters edit mode when edit button is clicked", async () => {
    renderWithProviders(<Balance />);
    const editButton = screen.getByTestId("BalanceEditButton");
    await userEvent.click(editButton);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("saves new balance when save button is clicked", async () => {
    renderWithProviders(<Balance />);

    const newBalance = 50.45;

    const editButton = screen.getByTestId("BalanceEditButton");
    await userEvent.click(editButton);

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, newBalance.toString());
    const saveButton = screen.getByTestId("BalanceSaveButton");
    await userEvent.click(saveButton);

    expect(
      screen.getByText(`Current Balance: $${newBalance.toFixed(2)}`),
    ).toBeInTheDocument();
  });

  it("save button is disabled because of validation error", async () => {
    renderWithProviders(<Balance />);
    const editButton = screen.getByTestId("BalanceEditButton");
    await userEvent.click(editButton);

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "-100");

    expect(screen.getByTestId("BalanceSaveButton")).toBeDisabled();
  });
});
