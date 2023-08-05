import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { React } from 'react';
import { act } from 'react-dom/test-utils';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import { mockFetchSuccess, mockFetchFailure } from '../../mocks/mockFetch';
import ProductsPage from './ProductsPage';
// import SideNav from './SideNav/SideNav';

describe('LatestProducts', () => {
  it('[SPYING]: fetch products getting data correctly', async () => {
    mockFetchSuccess([
      {
        discountApplicable: 10,
        imageUrl: 'images/babyhug-dhothi-dress.jpg',
        maxRetailPrice: 1999,
        tagLine: 'Full Sleeves Kurta & Dhoti Bandhani Print - White',
        imgAltText: 'baby hug image'
      }
    ]
    );
    await act(async () => {
      render(
        <HelmetProvider>
          <HashRouter>
            <ProductsPage />
          </HashRouter>
        </HelmetProvider>
      );
    })
    await waitFor(() => {
      expect(screen.getByAltText('baby hug image')).toBeInTheDocument();
    })
  });

  it('[SPYING]: fetch products error handling', async () => {
    mockFetchFailure('Not Found', 404);
    await act(async () => {
      render(
        <HelmetProvider>
          <HashRouter>
            <ProductsPage />
          </HashRouter>
        </HelmetProvider>
      );
    })
    await waitFor(() => {
      expect(screen.getByText('Unable to fetch products, try again later.')).toBeInTheDocument();
    })
  });

  it('[SPYING]: test rendered categories working as expected', async () => {
    mockFetchSuccess([
      { id: 1, name: 'All' },
      { id: 2, name: 'Men' },
      { id: 3, name: 'Women' }
    ]
    );
    await act(async () => {
      render(
        <HelmetProvider>
          <HashRouter>
            <ProductsPage />
          </HashRouter>
        </HelmetProvider>
      );
    })
    const navSection = screen.getByTestId('nav-section').querySelectorAll('a')[1];
    expect(navSection).toHaveAttribute('href', '#/products?category=Men');

    fireEvent.click(navSection);
    expect(window.location.hash).toBe('#/products?category=Men');
  });

  it('[SPYING]: test rendered dropdown working as expected', async () => {
    mockFetchSuccess([
      { id: 1, name: 'All' },
      { id: 2, name: 'Men' },
      { id: 3, name: 'Women' }
    ]
    );
    await act(() => {
      render(
        <HelmetProvider>
          <HashRouter>
            <ProductsPage />
          </HashRouter>
        </HelmetProvider>
      );
    })
    const navSection = screen.getByTestId('nav-section').querySelectorAll('a')[1];
    expect(navSection).toHaveAttribute('href', '#/products?category=Men');

    fireEvent.click(navSection);
    expect(window.location.hash).toBe('#/products?category=Men');

    const dropdownTitle = screen.getByText('Select Order');
    fireEvent.click(dropdownTitle);

    const ascendingOrder = screen.getByText('Price: Low to High');
    fireEvent.click(ascendingOrder);

    expect(window.location.hash).toBe('#/products?category=Men&sort=maxRetailPrice&order=asc');
  });
});
