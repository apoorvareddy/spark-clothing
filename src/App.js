import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes/AppRoutes';
import ErrorBoundary from './containers/shared/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <HelmetProvider>
      <HashRouter>
        <Header />
        <ErrorBoundary>
          <div className='main-container'>
            <AppRoutes />
          </div>
        </ErrorBoundary>
        <Footer />
      </HashRouter>
    </HelmetProvider>
  );
};

export default App;
