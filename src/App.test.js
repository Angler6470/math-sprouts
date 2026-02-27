import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Math Sprouts title', () => {
  render(<App />);
  const titles = screen.getAllByText(/Math Sprouts/i);
  expect(titles.length).toBeGreaterThan(0);
});
