import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { React } from 'react';
import { act } from 'react-dom/test-utils';
import { HashRouter } from 'react-router-dom';
import { mockFetchFailure, mockFetchSuccess } from '../../../mocks/mockFetch';
import LatestProducts from './LatestProducts';

describe('LatestProducts', () => {
  // test the product details rendered properly
  it('[SPYING]: fetch products getting data correctly', async () => {
    // mock success
    mockFetchSuccess([
      {
        discountApplicable: 10,
        imageUrl: 'images/babyhug-dhothi-dress.jpg',
        id: 23,
        maxRetailPrice: 1999,
        name: 'Babyhug Cotton',
        tagLine: 'Full Sleeves Kurta & Dhoti Bandhani Print - White',
        imgAltText: 'baby hug image'
      }
    ]);

    // render the latest products component
    await act(async () => {
      render(
        <HashRouter>
          <LatestProducts />
        </HashRouter>
      );
    })

    // wait for the product details to be present in the document
    await waitFor(() => {
      expect(screen.getByText('Babyhug Cotton')).toBeInTheDocument();
    });
  });

  // testing error scenario for fetch call
  it('[SPYING]: fetch products error handling', async () => {
    // failure mock
    mockFetchFailure('Not Found', 404);

    // render the latest products component
    await act(async () => {
      render(
        <HashRouter>
          <LatestProducts />
        </HashRouter>
      );
    })

    // wait for error to be present in the document
    await waitFor(() => {
      expect(screen.getByText('Unable to fetch products, try again later.')).toBeInTheDocument();
    })
  });

  // trigger view all and check the navigation
  it('view all button should navigate to products page', async () => {
    // success mock
    mockFetchSuccess([
      {
        discountApplicable: 10,
        imageUrl: 'images/babyhug-dhothi-dress.jpg',
        id: 23,
        maxRetailPrice: 1999,
        name: 'Babyhug Cotton',
        tagLine: 'Full Sleeves Kurta & Dhoti Bandhani Print - White',
        imgAltText: 'baby hug image'
      }
    ]);

    // render the latest products component
    await act(async () => {
      render(
        <HashRouter>
          <LatestProducts />
        </HashRouter>
      );
    })

    // get the view all button and expect to be present in the document
    const viewAllButton = screen.getByTestId('view-all');
    expect(viewAllButton).toBeInTheDocument();

    // trigger click on view all
    act(() => {
      fireEvent.click(viewAllButton);
    })

    // expect the window location to be for products page
    expect(window.location.hash).toBe('#/products');
  })
})
