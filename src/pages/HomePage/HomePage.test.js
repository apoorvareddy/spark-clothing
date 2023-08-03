import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('should contain latest products and all the services available', () => {
    render(
      <HelmetProvider>
        <HashRouter>
          <HomePage />
        </HashRouter>
      </HelmetProvider>
    )
    // getting the content elements
    const latestProductsHeading = screen.getByText('Latest Products');
    const shippingSubHeading = screen.getByText('FREE SHIPPING & RETURN');
    const moneyBackSubHeading = screen.getByText('MONEY BACK GUARANTEE');
    const onlineSupportSubHeading = screen.getByText('ONLINE SUPPORT 24/7');

    // all the elements which are neccessary should be present
    expect(latestProductsHeading).toBeInTheDocument();
    expect(shippingSubHeading).toBeInTheDocument();
    expect(moneyBackSubHeading).toBeInTheDocument();
    expect(onlineSupportSubHeading).toBeInTheDocument();
  })
});
