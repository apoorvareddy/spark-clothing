import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { mockFetchFailure, mockFetchSuccess } from '../../../mocks/mockFetch';
import SideNav from './SideNav';

describe('SideNav', () => {
  it('[SPYING]: fetch method getting data correctly', async () => {
    mockFetchSuccess([{ id: '1', name: 'Men' }, { id: '2', name: 'Women' }]);
    render(
      <HashRouter>
        <SideNav />
      </HashRouter>
    )
    const categoryName = await screen.findByText('Men');
    expect(categoryName).toBeInTheDocument();
  });

  it('[SPYING]: fetch method error scenario', async () => {
    mockFetchFailure('Not Found', 404);
    render(
      <HashRouter>
        <SideNav />
      </HashRouter>
    );
    const errorMessage = await screen.findByText('Unable to fetch categories, try again later.');
    expect(errorMessage).toBeInTheDocument();
  })
});
