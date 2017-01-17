import React, { PropTypes } from 'react'

const Picker = ({ value, onChange }) => (
  <span>
    <input onChange={e => onChange(e.target.value)}
           value={value}/>
  </span>
)

Picker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
