import React, { PropTypes } from 'react'

const SubInput = ({ value, handleSubmit }) => (
  <span>
    <input onKeyUp={e => (e.keyCode === 13) ?
           handleSubmit(e.target.value) : null}
           value={value}/>
  </span>
)

SubInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SubInput
