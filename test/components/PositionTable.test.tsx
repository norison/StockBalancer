import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PositionTable from '../../src/ui/components/PositionTable';
import {Position} from '../../src/ui/types/Position.ts';

describe('PositionTable', () => {
  const positions: Position[] = [
    {ticker: 'AAPL', quantity: 100, price: 150, target: 25},
    {ticker: 'GOOGL', quantity: 50, price: 2500, target: 25},
  ];

  const editRequested = vi.fn();
  const deleteRequested = vi.fn();

  it('renders positions correctly', () => {
    render(<PositionTable positions={positions} editRequested={editRequested} deleteRequested={deleteRequested} />);

    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
  });

  it('calls editRequested when edit button is clicked', async () => {
    render(<PositionTable positions={positions} editRequested={editRequested} deleteRequested={deleteRequested} />);

    const buttons = screen.getAllByTestId<HTMLButtonElement>("PositionTableEditButton");

    await userEvent.click(buttons[0]);
    expect(editRequested).toHaveBeenCalledWith(positions[0].ticker);
  });

  it('calls deleteRequested when delete button is clicked', async () => {
    render(<PositionTable positions={positions} editRequested={editRequested} deleteRequested={deleteRequested} />);

    const buttons = screen.getAllByTestId<HTMLButtonElement>("PositionTableDeleteButton");

    await userEvent.click(buttons[0]);
    expect(deleteRequested).toHaveBeenCalledWith(positions[0].ticker);
  });

  it('displays "No positions" message when positions array is empty', () => {
    render(<PositionTable positions={[]} editRequested={editRequested} deleteRequested={deleteRequested} />);

    expect(screen.getByText('No positions')).toBeInTheDocument();
  });
});