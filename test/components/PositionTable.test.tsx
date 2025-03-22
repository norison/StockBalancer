import {render, screen} from '@testing-library/react';
import PositionTable from "../../src/ui/components/PositionTable.tsx"
import {Position} from "../../src/ui/services/balancer/models/Position.ts";

const positions: Position[] = [
  {ticker: "AAPL", quantity: 10, price: 100, targetPercentage: 50},
  {ticker: "GOOGL", quantity: 5, price: 200, targetPercentage: 35},
  {ticker: "TSLA", quantity: 3, price: 300, targetPercentage: 15},
];

describe('PositionTable', () => {
  it('renders table', () => {
    render(<PositionTable positions={positions}/>);
    expect(screen.getByText('Ticket')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Percentage')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(positions.length);

    positions.forEach(position => {
      expect(screen.getByText(position.ticker)).toBeInTheDocument();
      expect(screen.getByText(position.quantity.toString())).toBeInTheDocument();
      expect(screen.getByText(position.price.toString())).toBeInTheDocument();
      expect(screen.getByText(position.targetPercentage.toString())).toBeInTheDocument();
    });
  });
});