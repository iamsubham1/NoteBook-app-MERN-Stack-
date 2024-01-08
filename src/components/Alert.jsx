// Alert.js

import React from 'react';
import PropTypes from 'prop-types';
import '../components/css/Alert.css'

const Alert = ({ type, message }) => {
    return (
        <div className={`alert-overlay ${type}`}>
            <div className={`alert alert-${type}`} role="alert">
                {message}
            </div>
        </div>
    );
};

Alert.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default Alert;
