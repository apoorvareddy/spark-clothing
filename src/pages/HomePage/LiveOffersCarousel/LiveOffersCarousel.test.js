import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LiveOffersCarousel from './LiveOffersCarousel';
import { HashRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

it('Carousel autoscrolls to the next slide', async () => {
  render(
    <HashRouter>
      <LiveOffersCarousel />
    </HashRouter>
  );
  const activeSlide = screen.getByAltText('Kids Slide');
  expect(activeSlide).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(5000);
  })

  await waitFor(() => {
    const nextSlide = screen.getByAltText('Mens Slide');
    expect(nextSlide).toBeInTheDocument();
  })
});
