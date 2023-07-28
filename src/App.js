import { HashRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes/AppRoutes';

const App = () => {
  return (
    <HashRouter>
      <Header />
      <div className='main-container'>
        <AppRoutes />
      </div>
      <Footer />
    </HashRouter>
  );
};

export default App;
