import React, { PropTypes } from 'react'

const SubInput = ({ handleSubmit }) => (
  <span>
    <input onKeyUp={e => (e.keyCode === 13) ?
           handleSubmit(e.target.value) : null}/>
  </span>
)

SubInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default SubInput
