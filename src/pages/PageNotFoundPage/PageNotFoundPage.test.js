import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import PageNotFoundPage from './PageNotFoundPage';

describe('PageNotFound', () => {
  // checking if page not found component is rendered
  it('should render the page not found component', () => {
    // render component
    render(
      <HelmetProvider>
        <HashRouter>
          <PageNotFoundPage />
        </HashRouter>
      </HelmetProvider>
    );

    // assert page not found component text is present
    expect(screen.getByText('The Page you are looking for is not available at the moment.')).toBeInTheDocument();
  })

  // checking if go back home link is navigating to home
  it('Go back to home link should navigate to the home page', () => {
    // render component
    const { container } = render(
      <HelmetProvider>
        <HashRouter>
          <PageNotFoundPage />
        </HashRouter>
      </HelmetProvider>
    );

    // get the link by query selector
    const link = container.querySelector('a');

    // trigger click on link
    fireEvent.click(link);

    // Assert that the navigation to the home page is happened
    expect(window.location.hash).toBe('#/');
  })
});
