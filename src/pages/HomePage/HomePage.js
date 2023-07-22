import LatestProducts from './LatestProducts/LatestProducts';
import LiveOffersCarousel from './LiveOffersCarousel/LiveOffersCarousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.css';
import {
  faHeadset,
  faCircleDollarToSlot,
  faTruckFast
} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const promisingServices = [
    {
      icon: faTruckFast,
      serviceName: 'FREE SHIPPING & RETURN',
      serviceDescription: 'Free shipping on all orders over Rs.499'
    },
    {
      icon: faCircleDollarToSlot,
      serviceName: 'MONEY BACK GUARANTEE',
      serviceDescription: '100% money back guarantee'
    },
    {
      icon: faHeadset,
      serviceName: 'ONLINE SUPPORT 24/7',
      serviceDescription: 'Reach us out at anytime'
    }
  ];
  return (
    <>
      <LiveOffersCarousel />
      <LatestProducts />
      <div className="promising-services">
        {promisingServices.map((service, i) => {
          return (
            <div className='promise-servcie' key={i}>
              <FontAwesomeIcon icon={service.icon} />
              <div>
                <h4>{service.serviceName}</h4>
                <p>{service.serviceDescription}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
