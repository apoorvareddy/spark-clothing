import { renderHook } from '@testing-library/react-hooks';
import useDiscountedPrice from './useDiscountedPrice';

// calculating the discounted price based on the MRP and discountPercentage
it('calculate the discounted price correctly', () => {
  // evaluating the useDiscountedPrice hook
  const { result } = renderHook(() => useDiscountedPrice(100, 20));

  // Assert the calculated value is correct
  expect(result.current.originalPrice).toBe(100);
  expect(result.current.discountedPrice).toBe(80);
});
