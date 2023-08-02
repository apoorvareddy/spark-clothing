import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import ContactUsPage from './ContactUsPage';

describe('ContactUsPage', () => {
  // checking proper contact form inputs and submit button rendered
  it('has proper contact form with name, email, phone, query inputs and submit button', () => {
    // rendering the component
    render(
      <HelmetProvider>
        <HashRouter>
          <ContactUsPage />
        </HashRouter>
      </HelmetProvider>
    );
    // get the elements using label text
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    const submitBtn = screen.getByRole('button');

    // check all the elements present in the document
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    // check the attributes for elements
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(submitBtn).toHaveAttribute('type', 'submit');
  });

  //
});
