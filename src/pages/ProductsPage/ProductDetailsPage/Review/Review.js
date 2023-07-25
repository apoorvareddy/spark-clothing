import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Review = () => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const [productDescription, setProductDescription] = useState({});
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    rating: '',
    comment: ''
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${params.productId}`)
      .then((res) => res.json())
      .then((res) => {
        setProductDescription(res);
        setReviews(res.reviews);
        // updatedReviews = res.reviews;
      })
      .catch((err) => console.error(err));
  }, [formState]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reviewCount = productDescription.reviews.length;
    console.log('reviewCount' + reviewCount);
    let updatedId;
    reviewCount > 0
      ? updatedId = productDescription.reviews[reviewCount - 1].id + 1
      : updatedId = 100

    console.log(updatedId);
    const updatedFormState = {
      ...formState,
      id: updatedId
    }
    setFormState({ ...updatedFormState });

    const updatedProductDetails = { ...productDescription };
    updatedProductDetails.reviews.push(updatedFormState);

    fetch(`http://localhost:5000/products/${params.productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProductDetails)
    })
      .then((res) => res.json())
      .then((res) => {
        setProductDescription(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
      })
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
      {reviews.map((review) => {
        return (
          <div key={review.id}>{review.name}</div>
        )
      })}

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
