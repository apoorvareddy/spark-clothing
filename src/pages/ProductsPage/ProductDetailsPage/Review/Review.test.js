import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Review from './Review';

global.fetch = jest.fn();

describe('Review', () => {
  it('should contain write a review button and on click it should show modal for review', () => {
    render(<Review />);
    const reviewButton = screen.getByText('Write a Review');
    expect(reviewButton).toBeInTheDocument();

    fireEvent.click(reviewButton);
    const nameElement = screen.getByText('Name');
    expect(nameElement).toBeInTheDocument();
  });

  it('should close the review modal when clicked on close button', async () => {
    render(<Review />);
    const reviewButton = screen.getByText('Write a Review');
    expect(reviewButton).toBeInTheDocument();
    fireEvent.click(reviewButton);
    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    await waitFor(() => {
      const modal = screen.queryByRole('dialog');
      expect(modal).not.toBeInTheDocument();
    })
  })
});
