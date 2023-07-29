import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  // let's catch the error
  // when there is a runtime error -- this method would be called automatically
  static getDerivedStateFromError (error) {
    // Update the state so the next render will show the fallback UI
    console.log(error);
    return {
      hasError: true
    };
  }

  render () {
    if (this.state.hasError) {
      return (
        <Alert variant='danger'>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>if the error persists contact admin</p>
        </Alert>
      );
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element
};

export default ErrorBoundary;
