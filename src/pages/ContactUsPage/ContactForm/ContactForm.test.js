import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('displays success message on successful form submission', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Apoorva' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'Apoorva@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Apoorva' } });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(screen.getByText('Message successfully submitted!')));
  })
});
