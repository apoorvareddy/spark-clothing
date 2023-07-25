import { Route, Routes } from 'react-router-dom';
import AboutUsPage from '../../pages/AboutUsPage/AboutUsPage';
import History from '../../pages/AboutUsPage/History/History';
import ContactUsPage from '../../pages/ContactUsPage/ContactUsPage';
import HomePage from '../../pages/HomePage/HomePage';
import PageNotFoundPage from '../../pages/PageNotFoundPage/PageNotFoundPage';
import ProductDetailsPage from '../../pages/ProductsPage/ProductDetailsPage/ProductDetailsPage';
import ProductsPage from '../../pages/ProductsPage/ProductsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path='products/:productId' element={<ProductDetailsPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/about-us" element={<AboutUsPage />} >
        <Route path='history' element={<History />} />
      </Route>
      <Route path='*' element={<PageNotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
