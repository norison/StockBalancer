import {render, screen} from '@testing-library/react';
import App from "../src/ui/App";

describe('App', () => {
  it('renders App component', () => {
    render(<App/>);

    expect(screen.getByText(/Add Ticker/)).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
})