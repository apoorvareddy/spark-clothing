import MenuItem from './MenuItem/MenuItem';
import homeIcon from '../../assets/icons/Home.png';
import contactIcon from '../../assets/icons/ContactUs.png'
import aboutIcon from '../../assets/icons/AboutUs.png'
import productIcon from '../../assets/icons/Product.png'

const Menu = () => {
  const menus = [
    {
      id: 1,
      title: 'HOME',
      iconSrc: homeIcon,
      path: '/'
    },
    {
      id: 2,
      title: 'PRODUCTS',
      iconSrc: productIcon,
      path: '/products'
    },
    {
      id: 3,
      title: 'ABOUT US',
      iconSrc: aboutIcon,
      path: '/about-us'
    },
    {
      id: 4,
      title: 'CONTACT US',
      iconSrc: contactIcon,
      path: '/contact-us'
    }
  ];

  return (
    <ul className="navbar-nav me-right mb-2 mb-md-0">
      {
        menus.map((item) =>
          <MenuItem key={item.id} title={item.title} path={item.path} iconSrc={item.iconSrc} />
        )
      }
    </ul>
  );
}

export default Menu;
