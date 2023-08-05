import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
// import { renderHook } from '@testing-library/react-hooks';
import useDiscountedPrice from '../../hooks/useDiscountedPrice/useDiscountedPrice';
import Product from './Product';

describe('Product', () => {
  // checking Product component renders the correct discounted price using useDiscountedPrice hook
  it('receives maxRetailPrice and discountApplicable and calculates the discountedPrice', () => {
    const maxRetailPrice = 100;
    const discountApplicable = 20;
    render(
      <HashRouter>
        <Product maxRetailPrice={maxRetailPrice} discountApplicable={discountApplicable} />
      </HashRouter>
    );

    const { originalPrice, discountedPrice } = useDiscountedPrice(maxRetailPrice, discountApplicable);
    expect(originalPrice).toBe(100);
    expect(discountedPrice).toBe(80);
  });

  it('renders all the product information correctly', () => {
    render(
      <HashRouter>
        <Product
          id={1}
          name='U.S. Polo'
          maxRetailPrice={5000}
          tagLine='white shirt'
          discountApplicable={10}
        />
      </HashRouter>
    )

    expect(screen.getByText('U.S. Polo')).toBeInTheDocument();
    expect(screen.getByText('Rs.5000')).toBeInTheDocument();
  })

  it('have right snapshot with all the requirements completed', () => {
    const snapshotInJson = renderer.create(
      <HashRouter>
        <Product
          imageUrl='images/ucb-t-shirt.jpg'
          name='UCB'
          tagLine='Full Sleeves Sweatshirt Text Print - Blue'
          imgAltText='UCB Full Sleeves Sweatshirt Text Print - Blue'
        />
      </HashRouter>
    ).toJSON();
    expect(snapshotInJson).toMatchSnapshot();
  })
});
