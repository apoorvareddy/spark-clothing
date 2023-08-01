import { render, screen, fireEvent } from '@testing-library/react';
import AboutUsPage from './AboutUsPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import History from './History/History';
import { HelmetProvider } from 'react-helmet-async';
// import { act } from 'react-dom/test-utils';

describe('AboutUsPage', () => {
  // check if the about us component rendered correctly
  it('should render about us component correctly', () => {
    // render component
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/about-us']}>
          <AboutUsPage />
        </MemoryRouter>
      </HelmetProvider>
    )
    // get the about us header
    const headingElement = screen.getByText('About Spart Clothing');
    expect(headingElement).toBeInTheDocument();
  });

  // check if we click on the link it will show the nested component
  it('renders History component when know more About us clicked', () => {
    // render component with initial value
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/about-us']}>
          <AboutUsPage />
          <Routes>
            <Route path='history' element={<History />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    // get the know more about us link
    const historyLink = screen.getByTestId('history');
    expect(historyLink).toBeInTheDocument();

    // // Trigger click on the historyLink
    fireEvent.click(historyLink);

    // check history component rendered or not
    const historyComponent = screen.getByTestId('history-content');
    expect(historyComponent).toBeInTheDocument();
  })
})
