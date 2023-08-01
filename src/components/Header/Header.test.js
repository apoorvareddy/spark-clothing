import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  // Logo is rendered in the header component or not
  it('should render logo', () => {
    // render the header in hashrouter
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    // get the logo element
    const logoElement = screen.getByAltText('Spark Clothing Shop Logo');
    // Assert logo is present in the document
    expect(logoElement).toBeInTheDocument();
  });

  it('should render all the icons and nav links', () => {
    // render header component in hash router
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );

    // get home icon and link text
    const home = screen.getByText('HOME');
    // Assert: HOME link text is present and fa-house icon present
    expect(home.childNodes[0]).toHaveClass('svg-inline--fa fa-house');
    expect(home.childNodes[1]).toHaveTextContent('HOME');

    // get products icon and link text
    const products = screen.getByText('PRODUCTS');
    // Assert: PRODUCTS link text is present and fa-cart-shopping icon present
    expect(products.childNodes[0]).toHaveClass('svg-inline--fa fa-cart-shopping');
    expect(products.childNodes[1]).toHaveTextContent('PRODUCTS');

    // get about icon and link text
    const about = screen.getByText('ABOUT US');
    // Assert: ABOUT US link text is present and fa-people-group icon present
    expect(about.childNodes[0]).toHaveClass('svg-inline--fa fa-people-group');
    expect(about.childNodes[1]).toHaveTextContent('ABOUT US');

    // get contact icon and link text
    const contact = screen.getByText('CONTACT US');
    // Assert: CONTACT US link text is present and fa-phone-volume icon present
    expect(contact.childNodes[0]).toHaveClass('svg-inline--fa fa-phone-volume');
    expect(contact.childNodes[1]).toHaveTextContent('CONTACT US');
  })
})
