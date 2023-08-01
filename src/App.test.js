import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  // checking whether the header and footer are rendering and app rendered correctly
  it('renders Header, Footer components or not and app component rendered correctly', () => {
    // Rendering the app component
    render(<App />);

    // get the header and footer
    const header = screen.getByTestId('header');
    const footer = screen.getByTestId('footer');

    // Assert header and footer are present
    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
})
