import { useEffect, useState } from 'react';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactForm from './ContactForm/ContactForm';
import Title from '../../components/Title/Title';
import './ContactUsPage.css';

const ContactUsPage = () => {
  const [contactDetails, setContactDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/contactData')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch');
        }
        return response.json();
      })
      .then((res) => {
        setContactDetails(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <Alert variant='danger'>Unable to fetch contact details, try after some time</Alert>
  }
  return (
    <Container className='contact-us'>
      <Title pageTitle='Contact Us' />
      <Row>
        <Col xs={12} md={6} >
          <h1>Contact Us</h1>
          <p>Reach out to us for any details about the products</p>
          <p><FontAwesomeIcon icon={faLocationDot} />{contactDetails?.address}</p>
          <p><FontAwesomeIcon icon={faPhone} />{contactDetails?.phone}</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> {contactDetails?.email}</p>
        </Col>
        <Col xs={12} md={6} >
          <ContactForm />
        </Col>
      </Row>
    </Container>
  )
}

export default ContactUsPage;
