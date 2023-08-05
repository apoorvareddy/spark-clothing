import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';

const PageNotFoundPage = () => {
  return (
    <>
      <Title pageTitle='404 Error' />

      <div className='text-center' style={{ paddingTop: '30px' }}>
        <h2>The Page you are looking for is not available at the moment.</h2>
        <Link to='/' className='text-center'>Go Back To Home</Link>
      </div>
    </>
  )
}

export default PageNotFoundPage;
