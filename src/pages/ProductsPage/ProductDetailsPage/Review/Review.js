import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from 'react-star-ratings';
import './Review.css'

const Review = ({ onFormSubmit, existingEmails }) => {
  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // hook form registraion
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [ratingValue, setRatingValue] = useState(0);
  const [submittedEmails, setSubmittedEmails] = useState(existingEmails);

  // to check if the email is existing
  const isEmailUnique = (email) => {
    return !submittedEmails.includes(email);
  }

  // performs closing the review modal and resets all data
  const handleClose = () => {
    setShow(false);
    setIsSuccess(false);
    reset();
    setRatingValue(0);
  }

  // performs show logic for modal
  const handleShow = () => setShow(true);

  // performs form submission logic for valid and error scenarios
  const onSubmit = async (formValue) => {
    if (isEmailUnique(formValue.email)) {
      await onFormSubmit({
        ...formValue,
        rating: ratingValue,
        id: Math.random()
      })
      setSubmittedEmails((prevEmails) => [...prevEmails, formValue.email]);
      setIsSuccess(true);
      setTimeout(handleClose, 2000);
    } else {
      setIsError(true)
    }
    setTimeout(() => {
      setIsSuccess(false);
      setIsError(false);
    }, 3000);
  }

  // performs rating change besed on selection
  const handleRatingChange = (newRating) => {
    setRatingValue(newRating);
  }

  return (
    <div className='review-section'>
      <Button className='write-a-review' onClick={handleShow}>
        Write a Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Write a Review</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <Form.Text className='text-danger'>{errors.name.message}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <Form.Text className='text-danger'>{errors.email.message}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Invalid phone number'
                  }
                })}
              />
              {errors.phone && <Form.Text className='text-danger'>{errors.phone.message}</Form.Text>}
            </Form.Group>

            <div>
              <Form.Label>Rating</Form.Label>
              <StarRating
                rating={ratingValue}
                starRatedColor='gold'
                changeRating={handleRatingChange}
                numberOfStars={5}
                starDimension='24px'
                starSpacing='2px'
              />
              {errors.rating && <Form.Text className='text-danger'>{errors.rating.message}</Form.Text>}
            </div>

            <Form.Group className="mb-3" controlId="comment">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('comment', { required: 'Message is required' })}
              />
              {errors.comment && <Form.Text className='text-danger'>{errors.comment.message}</Form.Text>}
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" type="reset" onClick={handleClose} data-testid='reset-btn'>
              Cancel
            </Button>
            <Button variant="primary" type="submit" data-testid='submit-btn'>
              Submit
            </Button>
          </Modal.Footer>

          {isSuccess && <p className='text-success text-center'>Review saved successfully!</p>}
          {isError && <p className='text-warning text-center'>Email already used for a review.</p>}
        </Form>
      </Modal>
    </div>
  );
};

Review.propTypes = {
  onFormSubmit: PropTypes.func,
  existingEmails: PropTypes.array
}

export default Review;
