// getting the MRP and the discount and calculating the discounted price
const useDiscountedPrice = (originalPrice, discountPercentage) => {
  const discountedPrice = Math.round(originalPrice - (originalPrice * discountPercentage) / 100);
  return { originalPrice, discountedPrice }
}

export default useDiscountedPrice;
