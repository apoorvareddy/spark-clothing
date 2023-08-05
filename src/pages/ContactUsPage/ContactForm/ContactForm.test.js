import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactForm from './ContactForm';
import { act } from 'react-dom/test-utils';

describe('ContactForm', () => {
  it('displays success message on successful form submission', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ })
    })
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Apoorva' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'Apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Apoorva' } });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(screen.getByText('Message successfully submitted!')).toBeInTheDocument());
  });

  it('handles form submission failure', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ })
    })
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Apoorva' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'Apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Apoorva' } });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(screen.getByText('Unable to submit your message, please try again.')));
  })

  it('displays success message and vanishes after 5 seconds', async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ })
    })
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Apoorva' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'Apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Apoorva' } });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(screen.getByText('Message successfully submitted!')).toBeInTheDocument());

    act(() => {
      jest.advanceTimersByTime(5000);
    })
    expect(screen.queryByText('Message successfully submitted!')).toBeNull();
  });
  it('submit the form with valid input', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        name: 'Bharath',
        email: 'bharath@gmail.com',
        message: 'Good Website'
      })
    })
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Apoorva' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'Apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Nice Website' } });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(screen.getByText('Message successfully submitted!')).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5000/getInTouchData',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Apoorva',
          email: 'Apoorva@gmail.com',
          message: 'Nice Website'
        })
      }
    )
  });

  it('render error messages when the form submitted without any values', async () => {
    render(
      <ContactForm />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      const nameError = screen.getByText('Name is required');
      expect(nameError).toBeInTheDocument();

      const emailError = screen.getByText('Email is required');
      expect(emailError).toBeInTheDocument();

      const messageError = screen.getByText('Message is required');
      expect(messageError).toBeInTheDocument();
    })
  })
});
