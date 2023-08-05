import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LiveOffersCarousel from './LiveOffersCarousel';
import { HashRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();
// testing the autoscrolls to next slide
it('Carousel autoscrolls to the next slide', async () => {
  // render the carousel
  render(
    <HashRouter>
      <LiveOffersCarousel />
    </HashRouter>
  );

  // get the active slide by using alt text and expect to be present
  const activeSlide = screen.getByAltText('Kids Slide');
  expect(activeSlide).toBeInTheDocument();

  // set the advance timer
  act(() => {
    jest.advanceTimersByTime(5000);
  })

  // wait for the next slide to be present in the document
  await waitFor(() => {
    const nextSlide = screen.getByAltText('Mens Slide');
    expect(nextSlide).toBeInTheDocument();
  })
});
