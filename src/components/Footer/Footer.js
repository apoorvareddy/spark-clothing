import Menu from '../Menu/Menu';
import { faSquareFacebook, faSquareTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const icons = [
    {
      icon: faSquareFacebook,
      url: 'https://www.facebook.com/sparkclothing'
    },
    {
      icon: faSquareTwitter,
      url: 'https://twitter.com/sparkclothing'
    },
    {
      icon: faInstagram,
      url: 'https://www.instagram.com/sparkclothing/'
    },
    {
      icon: faWhatsapp,
      url: 'https://api.whatsapp.com/send?phone=1234567890'
    }
  ]
  return (
    <div className='footer'>
      <Container>
        <Row>
          <Col xs={12} lg={7} className='footer-links-section'>
            <Menu showIcons={false} />
            <div className='font-icons'>
              {icons.map((item, index) => {
                return (
                  <Link key={index} to={item.url}>
                    <FontAwesomeIcon icon={item.icon} style={{ width: '30px', height: '30px' }} />
                  </Link>
                )
              })}
            </div>
          </Col>

          <Col xs={12} lg={5} className='copyright-section'>
            <span className='copyright-year'>© Copyright 2022</span>
            <span>|</span>
            <span className='footer-logo'>Spark Clothing</span>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer;
