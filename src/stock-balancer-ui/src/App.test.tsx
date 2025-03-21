import {it, expect} from "vitest";
import {render, screen} from '@testing-library/react';
import App from './App';

it('renders App component', () => {
  render(<App/>);
  const headingElement = screen.getByText(/App/i);
  expect(headingElement).toBeInTheDocument();
});
