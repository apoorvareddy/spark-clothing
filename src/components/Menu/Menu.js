import MenuItem from './MenuItem/MenuItem';
import {
  faHouse,
  faCartShopping,
  faPeopleGroup,
  faPhoneVolume
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Menu = ({ showIcons }) => {
  const menus = [
    {
      id: 1,
      title: 'HOME',
      iconSrc: faHouse,
      path: '/'
    },
    {
      id: 2,
      title: 'PRODUCTS',
      iconSrc: faCartShopping,
      path: '/products'
    },
    {
      id: 3,
      title: 'ABOUT US',
      iconSrc: faPeopleGroup,
      path: '/about-us'
    },
    {
      id: 4,
      title: 'CONTACT US',
      iconSrc: faPhoneVolume,
      path: '/contact-us'
    }
  ];

  return (
    <ul className="navbar-nav me-right mb-2 mb-md-0">
      {
        menus.map((item) =>
          <MenuItem key={item.id} title={item.title} path={item.path} iconSrc={item.iconSrc} showIcons={showIcons} />
        )
      }
    </ul>
  );
}

Menu.propTypes = {
  showIcons: PropTypes.bool
}

export default Menu;
