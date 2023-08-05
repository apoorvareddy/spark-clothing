import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { React } from 'react';
import { act } from 'react-dom/test-utils';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import { mockFetchSuccess, mockFetchFailure } from '../../mocks/mockFetch';
import ProductsPage from './ProductsPage';

describe('LatestProducts', () => {
  // testing products getting data correctly
  it('[SPYING]: fetch products getting data correctly', async () => {
    // success mock
    mockFetchSuccess([
      {
        discountApplicable: 10,
        imageUrl: 'images/babyhug-dhothi-dress.jpg',
        maxRetailPrice: 1999,
        tagLine: 'Full Sleeves Kurta & Dhoti Bandhani Print - White',
        imgAltText: 'baby hug image'
      }
    ]);

    // render products component
    await act(async () => {
      render(
        <HelmetProvider>
          <HashRouter>
            <ProductsPage />
          </HashRouter>
        </HelmetProvider>
      );
    })

    // get the product details and expect to be present in the document
    await waitFor(() => {
      expect(screen.getByAltText('baby hug image')).toBeInTheDocument();
    })
  });

  // testing error handling for product fetch api
  it('[SPYING]: fetch products error handling', async () => {
    // failure mock
    mockFetchFailure('Not Found', 404);

    // render products page component
    await act(async () => {
      render(
        <HelmetProvider>
          <HashRouter>
            <ProductsPage />
          </HashRouter>
        </HelmetProvider>
      );
    })

    // get the error by text and expect to be present
    await waitFor(() => {
      expect(screen.getByText('Unable to fetch products, try again later.')).toBeInTheDocument();
    })
  });

  // testing categories links functionality
  it('[SPYING]: test rendered categories working as expected', async () => {
    // success mock for categories
    mockFetchSuccess([
      { id: 1, name: 'All' },
      { id: 2, name: 'Men' },
      { id: 3, name: 'Women' }
    ]);

    // render the products page component
    await act(async () => {
      render(
        <HelmetProvider>
          <HashRouter>
            <ProductsPage />
          </HashRouter>
        </HelmetProvider>
      );
    })

    // get all the nav links using query selector and test attributes
    const navSection = screen.getByTestId('nav-section').querySelectorAll('a')[1];
    expect(navSection).toHaveAttribute('href', '#/products?category=Men');

    // trigger on the navlink
    act(() => {
      fireEvent.click(navSection);
    })

    // expect window location hash to be same as href attribute
    expect(window.location.hash).toBe('#/products?category=Men');
  });

  // test the sort dropdown working as expected or not
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

    // get all the nav link elements using query params
    const navSection = screen.getByTestId('nav-section').querySelectorAll('a')[1];
    const navSectionAll = screen.getByTestId('nav-section').querySelectorAll('a')[0];

    // expect the nav links to have proper attributes
    expect(navSection).toHaveAttribute('href', '#/products?category=Men');
    expect(navSectionAll).toHaveAttribute('href', '#/products');

    // click on nav link and test the window location hash
    fireEvent.click(navSection);
    expect(window.location.hash).toBe('#/products?category=Men');

    // get the dropdown button by using text and click on the button
    const dropdownTitle = screen.getByText('Select Order');
    fireEvent.click(dropdownTitle);

    // assume ascending and descending orders as options and get one element and trigger click
    const ascendingOrder = screen.getByText('Price: Low to High');
    fireEvent.click(ascendingOrder);

    // expect the window location hash to be as expected
    expect(window.location.hash).toBe('#/products?category=Men&sort=maxRetailPrice&order=asc');

    // trigger click on another nav section and expect the window location hash to be as expected
    fireEvent.click(navSectionAll);
    expect(window.location.hash).toBe('#/products');

    // trigger click on dropdown again and any order and test the window location
    fireEvent.click(dropdownTitle);
    fireEvent.click(ascendingOrder);
    expect(window.location.hash).toBe('#/products?sort=maxRetailPrice&order=asc');
  });
});
