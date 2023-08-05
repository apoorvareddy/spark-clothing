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
  });

  it('render errors when form submitted without filling values', async () => {
    render(<Review />);
    const reviewButton = screen.getByText('Write a Review');
    expect(reviewButton).toBeInTheDocument();
    fireEvent.click(reviewButton);

    const submitButton = screen.getByTestId('submit-btn');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    await waitFor(() => {
      const errorName = screen.getByText('Name is required');
      expect(errorName).toBeInTheDocument();

      const errorEmail = screen.getByText('Email is required');
      expect(errorEmail).toBeInTheDocument();

      const errorPhone = screen.getByText('Phone number is required');
      expect(errorPhone).toBeInTheDocument();

      const errorReview = screen.getByText('Message is required');
      expect(errorReview).toBeInTheDocument();
    })
  })
  it('displays error when submitting existing email', async () => {
    const onFormSubmitMock = jest.fn();
    const existingEmails = ['a@b.com', 'ab@ab.com'];

    render(
      <Review
        onFormSubmit={onFormSubmitMock}
        existingEmails={existingEmails}
      />
    )

    fireEvent.click(screen.getByText('Write a Review'));

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sayansh' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ab@ab.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234556788' } });
    fireEvent.change(screen.getByLabelText('Review'), { target: { value: 'Nice Website' } })
    const ratingInput = screen.getByText('Rating').parentElement.querySelectorAll('.star-container');
    fireEvent.click(ratingInput[2]);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = screen.getByText('Email already used for a review.');
      expect(successMessage).toBeInTheDocument();
    })
  })
});
