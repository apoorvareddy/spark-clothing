import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const Title = ({ pageTitle }) => {
  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  )
}

Title.propTypes = {
  pageTitle: PropTypes.string
}

export default Title;
