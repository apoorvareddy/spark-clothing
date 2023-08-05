import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductDetailsPage from './ProductDetailsPage';
import { mockFetchSuccess, mockFetchFailure } from '../../../mocks/mockFetch';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { act } from 'react-dom/test-utils';

describe('ProductDetailsPage', () => {
  it('[SPYING]: renders product details and review component', async () => {
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
    render(
      <HelmetProvider>
        <HashRouter>
          <ProductDetailsPage />
        </HashRouter>
      </HelmetProvider>
    )
    await waitFor(() => {
      expect(screen.getByAltText('baby hug image')).toBeInTheDocument();
    });

    expect(screen.getByText('Write a Review')).toBeInTheDocument();
  })

  it('submit the review form and show success message', async () => {
    jest.useFakeTimers();
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
    render(
      <HelmetProvider>
        <HashRouter>
          <ProductDetailsPage />
        </HashRouter>
      </HelmetProvider>
    )

    await waitFor(() => {
      expect(screen.getByAltText('baby hug image')).toBeInTheDocument();
    });

    const reviewButton = screen.getByText('Write a Review');
    expect(reviewButton).toBeInTheDocument();
    fireEvent.click(reviewButton);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sayansh' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'abc@abc.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234556788' } });
    fireEvent.change(screen.getByLabelText('Review'), { target: { value: 'Nice Website' } })
    const ratingInput = screen.getByText('Rating').parentElement.querySelectorAll('.star-container');
    fireEvent.click(ratingInput[2]);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = screen.getByText('Review saved successfully!');
      expect(successMessage).toBeInTheDocument();
    })

    act(() => {
      jest.advanceTimersByTime(4000);
    })
    expect(screen.queryByText('Review saved successfully!')).toBeNull();
  })

  it('[SPYING]: checking the API error handling', async () => {
    mockFetchFailure('Not Found', 404);

    render(
      <HelmetProvider>
        <HashRouter>
          <ProductDetailsPage />
        </HashRouter>
      </HelmetProvider>
    )
    await waitFor(() => {
      expect(screen.getByText('Invalid Product, The entered Product is not listed.')).toBeInTheDocument();
    })
  })
})
