import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import useDiscountedPrice from '../../../../hooks/useDiscountedPrice/useDiscountedPrice';
import ProductInformation from './ProductInformation';

describe('ProductInformation', () => {
  // checking Product information component renders the correct discounted price using useDiscountedPrice hook
  it('receives maxRetailPrice and discountApplicable and calculates the discountedPrice', () => {
    // mock data
    const maxRetailPrice = 100;
    const discountApplicable = 20;

    // render product information component
    render(
      <HashRouter>
        <ProductInformation maxRetailPrice={maxRetailPrice} discountApplicable={discountApplicable} />
      </HashRouter>
    );

    // use custom hook for testing prices are rendered properly
    const { originalPrice, discountedPrice } = useDiscountedPrice(maxRetailPrice, discountApplicable);
    expect(originalPrice).toBe(100);
    expect(discountedPrice).toBe(80);
  });

  // checking the initial value
  it('has counter with initial value 1', () => {
    render(<ProductInformation />);
    const quantity = screen.getByTestId('currentQuantity');
    expect(quantity.textContent).toBe('1');
  });

  // Checking the increment and decrement working correctly
  it('has properly working increment and decrement buttons', () => {
    render(<ProductInformation quantity={10}/>);
    // fetching initial quantity
    const currentQuantity = screen.getByTestId('currentQuantity');
    expect(currentQuantity.textContent).toBe('1');

    // finding the increment and decrement buttons
    const incrementBtn = screen.getByTestId('incrementBtn');
    const decrementBtn = screen.getByTestId('decrementBtn');

    // trigger the click event on incrementBtn and check the quantity
    fireEvent.click(incrementBtn);
    expect(currentQuantity.textContent).toBe('2');

    // trigger the click event on decrementBtn and check the quantity
    fireEvent.click(decrementBtn);
    expect(currentQuantity.textContent).toBe('1');
  });

  // checking the quantity is having max value upon increment
  it('has quantity with max value "quantity" upon continuous increment', () => {
    // render the product information component with prop quantity
    render(<ProductInformation quantity={10} />);

    // fetching currentQuantity element
    const currentQuantity = screen.getByTestId('currentQuantity');
    expect(currentQuantity.textContent).toBe('1');

    // Finding the increment and decrement buttons
    const incrementBtn = screen.getByTestId('incrementBtn');
    const decrementBtn = screen.getByTestId('decrementBtn');

    // trigger the click event on increment button
    for (let i = 0; i < 10; i++) {
      fireEvent.click(incrementBtn);
    }
    fireEvent.click(incrementBtn);
    expect(currentQuantity.textContent).toBe('10');

    // trigger the click event on decrement button
    for (let i = 10; i > 1; i--) {
      fireEvent.click(decrementBtn);
    }
    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);
    expect(currentQuantity.textContent).toBe('1');
  })
});
