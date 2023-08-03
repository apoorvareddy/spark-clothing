import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { React } from 'react';
import { act } from 'react-dom/test-utils';
import { HashRouter } from 'react-router-dom';
import { mockFetchFailure, mockFetchSuccess } from '../../../mocks/mockFetch';
import LatestProducts from './LatestProducts';

describe('LatestProducts', () => {
  it('[SPYING]: fetch products getting data correctly', async () => {
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
    await act(async () => {
      render(
        <HashRouter>
          <LatestProducts />
        </HashRouter>
      );
    })

    await waitFor(() => {
      expect(screen.getByText('Babyhug Cotton')).toBeInTheDocument();
    });
  });

  it('[SPYING]: fetch products getting data correctly', async () => {
    mockFetchFailure('Not Found', 404);
    await act(async () => {
      render(
        <HashRouter>
          <LatestProducts />
        </HashRouter>
      );
    })

    await waitFor(() => {
      expect(screen.getByText('Unable to fetch products, try again later.')).toBeInTheDocument();
    })
  });

  it('view all button should navigate to products page', async () => {
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

    await act(async () => {
      render(
        <HashRouter>
          <LatestProducts />
        </HashRouter>
      );
    })

    const viewAllButton = screen.getByTestId('view-all');
    expect(viewAllButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(viewAllButton);
    })

    expect(window.location.hash).toBe('#/products');
  })
})
