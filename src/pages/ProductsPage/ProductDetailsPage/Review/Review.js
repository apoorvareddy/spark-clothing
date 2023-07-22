import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Review = () => {
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    rating: '',
    comment: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    setFormState({ ...formState });

    await fetch('http://localhost:5000/products/1', {
      method: 'patch',
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: ''
      },
      body: JSON.stringify({ formdata: formState }),
      credentials: 'include'

    })
      .then(res => res.json())
      .then(res => {
        return res
      })
      .catch(err => console.error(err))
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Write a Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Write a Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="reviewName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formState.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reviewEmail">
              <Form.Label className="col-12 col-md-4">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reviewPhone">
              <Form.Label className="col-12 col-md-4">Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              name="rating"
              value={formState.rating}
              onChange={handleChange}
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="reviewComment">
              <Form.Label className="col-12 col-md-4">
                Example textarea
              </Form.Label>
              <Form.Control
                className="col-12 col-md-8"
                as="textarea"
                rows={3}
                name="comment"
                value={formState.comment}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Review;
