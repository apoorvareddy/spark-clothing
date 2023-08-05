import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactForm from './ContactForm';
import { act } from 'react-dom/test-utils';

describe('ContactForm', () => {
  // testing whether success message appears on successfull submission with mock success resolve
  it('displays success message on successful form submission', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ })
    })

    // render the contact form
    render(<ContactForm />);

    // change the input values tp valid input using fireEvent change
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Apoorva' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'Apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Apoorva' } });

    // trigger submit using fireEvent
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // wait for success messege to be present
    await waitFor(() => expect(screen.getByText('Message successfully submitted!')).toBeInTheDocument());
  });

  // testing whether error message present on api call failure with mock failure
  it('handles form submission failure', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ })
    })

    // render the contact form
    render(<ContactForm />);

    // change the input values tp valid input using fireEvent change
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Apoorva' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'Apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Apoorva' } });

    // trigger submit using fireEvent
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // wait for error messege to be present
    await waitFor(() => expect(screen.getByText('Unable to submit your message, please try again.')));
  })

  // testing success message is removed after 5 seconds of successful submission
  it('displays success message and vanishes after 5 seconds', async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ })
    })

    // render the contact form
    render(<ContactForm />);

    // change the input values tp valid input using fireEvent change
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Apoorva' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'Apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Apoorva' } });

    // trigger submit using fireEvent
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // wait for success messege to be present
    await waitFor(() => expect(screen.getByText('Message successfully submitted!')).toBeInTheDocument());

    // set the timer using advance timer
    act(() => {
      jest.advanceTimersByTime(5000);
    })

    // wait for success msg to be removed
    expect(screen.queryByText('Message successfully submitted!')).toBeNull();
  });

  // testing whether form submitted with valid input entered
  it('submit the form with valid input', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        name: 'Bharath',
        email: 'bharath@gmail.com',
        message: 'Good Website'
      })
    })

    // render the contact form
    render(<ContactForm />);

    // change the input values tp valid input using fireEvent change
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Apoorva' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'Apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Nice Website' } });

    // trigger submit using fireEvent
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // wait for success messege to be present
    await waitFor(() => expect(screen.getByText('Message successfully submitted!')).toBeInTheDocument());

    // send the post call with the entered input details
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

  // testing whether displaying errors on empty form submission
  it('render error messages when the form submitted without any values', async () => {
    // render contact form
    render(
      <ContactForm />
    )

    // trigger click on the submit button by getting the submit button using getbyrole
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // wait for all the error messages to be present by getting the error elements by text
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
