import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// create a mock component that throws an error for testing
const MockComponent = () => {
  throw new Error('Test Error');
}

describe('ErrorBoundary', () => {
  // checking if it renders error message when a child component throws an error
  it('renders error message when a child component throws an error', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <MockComponent />
      </ErrorBoundary>
    );

    const errorElement = screen.getByText('Oh snap! You got an error!');
    expect(errorElement).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('renders children component when no error occurs', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <div>Success Component without any error</div>
      </ErrorBoundary>
    )

    const successElement = screen.getByText('Success Component without any error');
    expect(successElement).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  })
});
