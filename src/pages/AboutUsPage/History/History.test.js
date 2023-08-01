import { render, screen } from '@testing-library/react';
import History from './History';

// checking whether the history component is rendering correct
it('should render history component correctly', () => {
  // render component
  render(<History />);

  // get heading using getByTestId
  const headingElement = screen.getByTestId('history-heading');
  expect(headingElement).toBeInTheDocument();
});
