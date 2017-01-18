import React, { PropTypes } from 'react'

import Chip from 'material-ui/Chip'

const SubRedditChip = ({ name, handleDelete }) => (
  <Chip onRequestDelete={handleDelete}>
    {name}
  </Chip>
)

Chip.propTypes = {
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default SubRedditChip
