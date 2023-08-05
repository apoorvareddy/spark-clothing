import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null
    };
  }

  // let's catch the error
  // when there is a runtime error -- this method would be called automatically
  static getDerivedStateFromError (error) {
    // Update the state so the next render will show the fallback UI
    return {
      hasError: true,
      errorMessage: error
    };
  }

  // componentDidCatch (error, compiledError) {
  //   // console.log('====Inside ComponentDidCatch========');
  //   console.log(error); // error in original source code
  //   console.log(compiledError); // error in compiled bundle.js
  //   // you can log the error in some third party tools ex: LogRocket
  // }

  render () {
    if (this.state.hasError) {
      return (
        <Alert variant='danger'>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{this.state.errorMessage && this.state.errorMessage.toString()}</p>
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
