import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'

const SubInput = ({ handleSubmit }) => (
  <div className='input-wrapper'>
    <TextField id='subreddit-input'
               floatingLabelText="Add Subreddit"
               floatingLabelStyle={{ fontSize: 24 }}
               onKeyUp={e => (e.keyCode === 13) ? handleSubmit(e.target.value) : null }/>
  </div>
)

SubInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default SubInput
