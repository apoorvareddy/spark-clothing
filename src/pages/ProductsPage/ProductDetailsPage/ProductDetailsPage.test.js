import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductDetailsPage from './ProductDetailsPage';
import { mockFetchSuccess, mockFetchFailure } from '../../../mocks/mockFetch';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { act } from 'react-dom/test-utils';

describe('ProductDetailsPage', () => {
  // testing product details rendered properly
  it('[SPYING]: renders product details and review component', async () => {
    // success mock
    mockFetchSuccess(
      {
        id: 1,
        discountApplicable: 10,
        imageUrl: 'images/babyhug-dhothi-dress.jpg',
        maxRetailPrice: 1999,
        tagLine: 'Full Sleeves Kurta & Dhoti Bandhani Print - White',
        imgAltText: 'baby hug image',
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

    // render the product details component
    render(
      <HelmetProvider>
        <HashRouter>
          <ProductDetailsPage />
        </HashRouter>
      </HelmetProvider>
    )

    // wait for the product details to be present in the document
    await waitFor(() => {
      expect(screen.getByAltText('baby hug image')).toBeInTheDocument();
    });

    // get the review button by using text and expect to be in the document
    expect(screen.getByText('Write a Review')).toBeInTheDocument();
  })

  // on successful form submission show success message and removed after sometime
  it('submit the review form and show success message', async () => {
    // using fake timers to test success message removal after set time
    jest.useFakeTimers();

    // success mock
    mockFetchSuccess(
      {
        id: 1,
        discountApplicable: 10,
        imageUrl: 'images/babyhug-dhothi-dress.jpg',
        maxRetailPrice: 1999,
        tagLine: 'Full Sleeves Kurta & Dhoti Bandhani Print - White',
        imgAltText: 'baby hug image',
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

    // render the product details component
    render(
      <HelmetProvider>
        <HashRouter>
          <ProductDetailsPage />
        </HashRouter>
      </HelmetProvider>
    )

    // wait for the details to be present in the document
    await waitFor(() => {
      expect(screen.getByAltText('baby hug image')).toBeInTheDocument();
    });

    // get the review button an expect to be in the document and trigger click
    const reviewButton = screen.getByText('Write a Review');
    expect(reviewButton).toBeInTheDocument();
    fireEvent.click(reviewButton);

    // trigger change and set all the valid data to the input values
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sayansh' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'abc@abc.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234556788' } });
    fireEvent.change(screen.getByLabelText('Review'), { target: { value: 'Nice Website' } })
    const ratingInput = screen.getByText('Rating').parentElement.querySelectorAll('.star-container');
    fireEvent.click(ratingInput[2]);

    // get the submit button and trigger click
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // wait for the success message and expect to be present in the document
    await waitFor(() => {
      const successMessage = screen.getByText('Review saved successfully!');
      expect(successMessage).toBeInTheDocument();
    })

    // set the advance timer
    act(() => {
      jest.advanceTimersByTime(4000);
    })

    // expect the success message to be null
    expect(screen.queryByText('Review saved successfully!')).toBeNull();
  })

  // testing api error handling
  it('[SPYING]: checking the API error handling', async () => {
    // failure mock
    mockFetchFailure('Not Found', 404);

    // render product details component
    render(
      <HelmetProvider>
        <HashRouter>
          <ProductDetailsPage />
        </HashRouter>
      </HelmetProvider>
    )

    // wait for the error message to be in the document
    await waitFor(() => {
      expect(screen.getByText('Invalid Product, The entered Product is not listed.')).toBeInTheDocument();
    })
  })
})
