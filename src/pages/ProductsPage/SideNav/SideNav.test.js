import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { mockFetchFailure, mockFetchSuccess } from '../../../mocks/mockFetch';
import SideNav from './SideNav';

describe('SideNav', () => {
  // test the api is getting the data correctly
  it('[SPYING]: fetch method getting data correctly', async () => {
    // success mock
    mockFetchSuccess([{ id: '1', name: 'Men' }, { id: '2', name: 'Women' }]);

    // render side nav component
    render(
      <HashRouter>
        <SideNav />
      </HashRouter>
    )

    // get the category and expect to be in the document
    const categoryName = await screen.findByText('Men');
    expect(categoryName).toBeInTheDocument();

    // click on the nav link and expect the location is to be as expected
    fireEvent.click(categoryName);
    expect(window.location.hash).toBe('#/products?category=Men');
  });

  // fetch error handling
  it('[SPYING]: fetch method error scenario', async () => {
    // failure mock
    mockFetchFailure('Not Found', 404);

    // render sidenav component
    render(
      <HashRouter>
        <SideNav />
      </HashRouter>
    );

    // get the error message and expect to be in the document
    const errorMessage = await screen.findByText('Unable to fetch categories, try again later.');
    expect(errorMessage).toBeInTheDocument();
  });
});
