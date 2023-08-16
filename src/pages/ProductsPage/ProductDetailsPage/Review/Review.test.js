import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Review from './Review';
import { mockFetchSuccess, mockFetchFailure } from '../../../../mocks/mockFetch';

global.fetch = jest.fn();

describe('Review', () => {
  // testing the review button click opens modal
  it('should contain write a review button and on click it should show modal for review', () => {
    // render review component
    render(<Review reviews={[
      {
        id: 1,
        name: 'Apoorva',
        email: 'apoorva@gmail.com',
        phone: '9876543210',
        rating: 5,
        comment: 'Good Website'
      }
    ]} />);

    // get the review button using text and expect to be in the document
    const reviewButton = screen.getByText('Write a Review');
    expect(reviewButton).toBeInTheDocument();

    // trigger click on review button and expect Name label to be in the document
    fireEvent.click(reviewButton);
    const nameElement = screen.getByText('Name');
    expect(nameElement).toBeInTheDocument();
  });

  // testing the close button of the modal
  it('should close the review modal when clicked on close button', async () => {
    // render the review component
    render(<Review reviews={[
      {
        id: 1,
        name: 'Apoorva',
        email: 'apoorva@gmail.com',
        phone: '9876543210',
        rating: 5,
        comment: 'Good Website'
      }
    ]} />);

    // get the review button using text expect to be in the document and trigger click
    const reviewButton = screen.getByText('Write a Review');
    expect(reviewButton).toBeInTheDocument();
    fireEvent.click(reviewButton);

    // in modal get the close button using label and expect to be in the document and trigger click
    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    // wait for the modal to be closed not to be in the document
    await waitFor(() => {
      const modal = screen.queryByRole('dialog');
      expect(modal).not.toBeInTheDocument();
    })
  });

  // test the errors when submitted without filling the form
  it('render errors when form submitted without filling values', async () => {
    // render review component
    render(<Review reviews={[
      {
        id: 1,
        name: 'Apoorva',
        email: 'apoorva@gmail.com',
        phone: '9876543210',
        rating: 5,
        comment: 'Good Website'
      }
    ]} />);

    // get the review and trigger click
    const reviewButton = screen.getByText('Write a Review');
    expect(reviewButton).toBeInTheDocument();
    fireEvent.click(reviewButton);

    // get the submit button and trigger click
    const submitButton = screen.getByTestId('submit-btn');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    // wait for the error messages to be in the document
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
  });

  // testing error on submitting review multiple times
  it('displays error when submitting existing email', async () => {
    // mock submit function
    const onFormSubmitMock = jest.fn();
    // define existing emails

    // render review components with prop existing emails and prop function onsubmit
    render(<Review reviews={[
      {
        id: 1,
        name: 'Apoorva',
        email: 'apoorva@gmail.com',
        phone: '9876543210',
        rating: 5,
        comment: 'Good Website'
      }
    ]}
    onFormSubmit={onFormSubmitMock} />);
    // trigger click on the review button
    fireEvent.click(screen.getByText('Write a Review'));

    // trigger change on all the input fields with valid data and use existing email
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sayansh' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234556788' } });
    fireEvent.change(screen.getByLabelText('Review'), { target: { value: 'Nice Website' } })
    const ratingInput = screen.getByText('Rating').parentElement.querySelectorAll('.star-container');
    fireEvent.click(ratingInput[2]);

    // trigger click on submit
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // wait for email alredy existing message
    await waitFor(() => {
      const emailExistingMessage = screen.getByText('Email already used for a review.');
      expect(emailExistingMessage).toBeInTheDocument();
    })
  });

  // submit the form with the valid input and expect success message
  it('should display success message on submitting valid input data', async () => {
    // success mock
    mockFetchSuccess(
      {
        reviews: [
          {
            name: 'Aps',
            phone: '1234567890',
            email: 'a@b.com',
            rating: 2,
            comment: 'Good Website'
          }
        ]
      }
    );

    // mock submit function
    const onFormSubmitMock = jest.fn();

    // render review components with props
    render(<Review reviews={[
      {
        id: 1,
        name: 'Apoorva',
        email: 'apoorva@gmail.com',
        phone: '9876543210',
        rating: 5,
        comment: 'Good Website'
      }
    ]}
    onFormSubmit={onFormSubmitMock} />);

    // trigger click on the review button
    fireEvent.click(screen.getByText('Write a Review'));

    // trigger change on all the input fields with valid data
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sayansh' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'sayansh@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234556788' } });
    fireEvent.change(screen.getByLabelText('Review'), { target: { value: 'Nice Website' } })
    const ratingInput = screen.getByText('Rating').parentElement.querySelectorAll('.star-container');
    fireEvent.click(ratingInput[2]);

    // trigger click on submit
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // wait for success message
    await waitFor(() => {
      const successMessage = screen.getByText('Review saved successfully!');
      expect(successMessage).toBeInTheDocument();
    })
  });

  // displays error message when server gives error while submitting
  it('[SPYING]: checking the API error handling', async () => {
    // failure mock
    mockFetchFailure('Unable to patch', 500);

    // mock submit function
    const onFormSubmitMock = jest.fn();

    // render review components with props
    render(<Review reviews={[
      {
        id: 1,
        name: 'Apoorva',
        email: 'apoorva@gmail.com',
        phone: '9876543210',
        rating: 5,
        comment: 'Good Website'
      }
    ]}
    onFormSubmit={onFormSubmitMock} />);

    // trigger click on the review button
    fireEvent.click(screen.getByText('Write a Review'));

    // trigger change on all the input fields with valid data
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sayansh' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'sayansh@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234556788' } });
    fireEvent.change(screen.getByLabelText('Review'), { target: { value: 'Nice Website' } })
    const ratingInput = screen.getByText('Rating').parentElement.querySelectorAll('.star-container');
    fireEvent.click(ratingInput[2]);

    // trigger click on submit
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // wait for error message
    await waitFor(() => {
      const errorMessage = screen.getByText('Unable to submit review, try again later.');
      expect(errorMessage).toBeInTheDocument();
    })
  })
});
