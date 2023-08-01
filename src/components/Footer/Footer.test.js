import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer', () => {
  // checking if navigation links rendered without icons
  it('should have navigation links without icons', () => {
    // render the component
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );

    // get the links to be checked
    const home = screen.getByText('HOME');
    const products = screen.getByText('PRODUCTS');
    const about = screen.getByText('ABOUT US');
    const contact = screen.getByText('CONTACT US');

    // get all the font awesome icons
    const icons = screen.getAllByRole('img');
    expect(icons.length).toBe(4);
    expect(icons.length).not.toBe(8);

    // Assert all the links are present in the document
    expect(home).toBeInTheDocument();
    expect(products).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(contact).toBeInTheDocument();
  })

  // checking brand icons 4 rendered
  it('should render 4 brand icons', () => {
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );

    // get the icon with title facebook and test whether it is present in the document
    const facebook = screen.getByTitle('facebook');
    expect(facebook).toBeInTheDocument();

    // get the icon with title twitter and test whether it is present in the document
    const twitter = screen.getByTitle('twitter');
    expect(twitter).toBeInTheDocument();

    // get the icon with title instagram and test whether it is present in the document
    const instagram = screen.getByTitle('instagram');
    expect(instagram).toBeInTheDocument();

    // get the icon with title whatsapp and test whether it is present in the document
    const whatsapp = screen.getByTitle('whatsapp');
    expect(whatsapp).toBeInTheDocument();
  });

  // checking copyright section present
  it('should have copyright content', () => {
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );
    // get the copyright section by text
    const copyright = screen.getByText('© 2023 www.sparkclothing.com.');
    const footerLogo = screen.getByText('Spark Clothing');
    // Assert the copyright content present
    expect(copyright).toBeInTheDocument();
    expect(footerLogo).toBeInTheDocument();
  })
})
