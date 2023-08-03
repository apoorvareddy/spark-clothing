import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import ContactUsPage from './ContactUsPage';
import { mockFetchFailure, mockFetchSuccess } from '../../mocks/mockFetch';

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

  // fetch method working as expected
  it('[SPYING]: fetch method getting the data correctly', async () => {
    mockFetchSuccess({
      address: 'Hyderabad',
      phone: ['(91) 987 123 5678'],
      email: 'apoorva@sparkclothing.com'
    })
    render(
      <HelmetProvider>
        <HashRouter>
          <ContactUsPage />
        </HashRouter>
      </HelmetProvider>
    );
    const contactEmail = await screen.findByText('apoorva@sparkclothing.com');
    expect(contactEmail).toBeInTheDocument();
  })

  // Fetch failure test
  it('[SPYING]: fetch get method error scenario', async () => {
    mockFetchFailure('Not Found', 404);
    render(
      <HelmetProvider>
        <HashRouter>
          <ContactUsPage />
        </HashRouter>
      </HelmetProvider>
    );
    const errorMessage = await screen.findByText('Unable to fetch contact details, try after some time');
    expect(errorMessage).toBeInTheDocument();
  })
});
