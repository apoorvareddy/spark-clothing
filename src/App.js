import { HashRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes/AppRoutes';

const App = () => {
  return (
    <HashRouter>
      <Header />
      <AppRoutes />
    </HashRouter>
  );
};

export default App;
