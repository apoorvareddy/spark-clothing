import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ title, path, iconSrc }) => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" aria-current='page' to={path}>
        <img src={iconSrc} alt='menu item icon' style={{ width: '30px', height: '24px', paddingRight: '5px' }}/>{title}
      </NavLink>
    </li>
  )
}

MenuItem.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  iconSrc: PropTypes.string
}

export default MenuItem;
