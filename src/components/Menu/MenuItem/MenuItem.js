import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = ({ title, path, iconSrc, showIcons }) => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" aria-current='page' to={path}>
        { showIcons && <FontAwesomeIcon icon={iconSrc} style={{ paddingRight: '5px' }} /> }
        {title}
      </NavLink>
    </li>
  )
}

MenuItem.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  iconSrc: PropTypes.object,
  showIcons: PropTypes.bool
}

export default MenuItem;
