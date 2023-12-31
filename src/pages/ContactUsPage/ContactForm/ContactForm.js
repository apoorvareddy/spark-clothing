import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

const ContactForm = () => {
  // getting the required functions from react hook form
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // setting the isSuccess based on the api call status and displaying success msg based on isSuccess
  const [isSuccess, setIsSuccess] = useState(false);
  // setting the isError based on the api call status and displaying error msg based on isError
  const [isError, setIsError] = useState(false);

  // onSubmit funtion triggers on form submission with form data
  const onSubmit = async (data) => {
    await fetch('http://localhost:5000/getInTouchData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to post');
        }
        return response.json();
      })
      .then((res) => {
        res && setIsError(false);
        res && setIsSuccess(true);
        // resetting the values after submission
        reset();
      })
      .catch((err) => {
        err && setIsError(true);
      });

    // making isSuccess false after 5 secs of success message
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && <Form.Text className='text-danger'>{errors.message.message}</Form.Text>}
      </Form.Group>

      <Button type='submit'>Submit</Button>
      { isSuccess && <Alert variant='success'>Message successfully submitted!</Alert> }
      { isError && <Alert variant='danger'>Unable to submit your message, please try again.</Alert>}
    </Form>
  )
}

export default ContactForm;
