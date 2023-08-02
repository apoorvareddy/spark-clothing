import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  // create a mock component that throws an error for testing
  const MockComponent = () => {
    throw new Error('Test Error');
  }

  // checking if it renders error message when a child component throws an error
  it('renders error message when a child component throws an error', () => {
    render(
      <ErrorBoundary>
        <MockComponent />
      </ErrorBoundary>
    );
  })
});
