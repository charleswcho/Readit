import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const SubInput = ({ handleSubmit }) => (
  <div className="input-wrapper">
    <TextField
      id="subreddit-input"
      label="Add Subreddit"
      onKeyUp={e => (e.keyCode === 13 ? handleSubmit(e.target.value) : null)}
    />
  </div>
);

SubInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default SubInput;
