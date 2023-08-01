import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes'

describe('AppRoutes', () => {
  // checking home component is rendered when the route is /
  it('renders home component when on the home route', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>
    )

    const latestProducts = screen.getByText('Latest Products');
    // Assert home page is rendered text of the home is present in the document
    expect(latestProducts).toBeInTheDocument();
  });

  // checking products component is rendered when the route is /products
  it('renders products component when on the products route', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/products']}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>
    )
    // Assert products page is rendered text of the products page is present in the document
    const productElement = screen.getByText('Products');
    expect(productElement).toBeInTheDocument();
  });

  // checking about us component is rendered when the route is /about-us
  it('renders products component when on the products route', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/about-us']}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>
    )
    // Assert products page is rendered text of the products page is present in the document
    const aboutElement = screen.getByText('About Spart Clothing');
    expect(aboutElement).toBeInTheDocument();
  });
});
