import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Balance from "../../src/ui/components/Balance";
import { expect } from "vitest";

describe("Balance", () => {
  const balance = 10.2;
  const balanceChanged = vi.fn();

  it("renders balance correctly", () => {
    render(<Balance balance={balance} balanceChanged={balanceChanged} />);
    expect(
      screen.getByText(`Current Balance: $${balance}`),
    ).toBeInTheDocument();
  });

  it("enters edit mode when edit button is clicked", async () => {
    render(<Balance balance={balance} balanceChanged={balanceChanged} />);
    const editButton = screen.getByTestId("BalanceEditButton");
    await userEvent.click(editButton);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("saves new balance when save button is clicked", async () => {
    render(<Balance balance={balance} balanceChanged={balanceChanged} />);
    const editButton = screen.getByTestId("BalanceEditButton");
    await userEvent.click(editButton);

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "10.4");
    const saveButton = screen.getByTestId("BalanceSaveButton");
    await userEvent.click(saveButton);

    expect(balanceChanged).toHaveBeenCalledWith(10.4);
    expect(saveButton).toBeEnabled();
  });

  it("balanceChanged was not called because of validation error", async () => {
    render(<Balance balance={balance} balanceChanged={balanceChanged} />);
    const editButton = screen.getByTestId("BalanceEditButton");
    await userEvent.click(editButton);

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "-100");

    expect(screen.getByTestId("BalanceSaveButton")).toBeDisabled();
    expect(balanceChanged).not.toHaveBeenCalled();
  });
});
