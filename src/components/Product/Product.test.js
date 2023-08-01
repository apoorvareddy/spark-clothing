import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
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
});
