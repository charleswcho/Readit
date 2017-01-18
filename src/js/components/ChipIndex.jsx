import React, { Component, PropTypes } from 'react'
import Chip from 'material-ui/Chip'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class ChipIndex extends Component {
  static propTypes = {
    handleDelete: PropTypes.func.isRequired,
    chips: PropTypes.array.isRequired
  }

  renderChip = (chip, idx) => {
    return (
      <Chip key={idx}
            onRequestDelete={() => this.props.handleDelete(idx)}
            style={styles.chip}>
        {chip}
      </Chip>
    );
  }

  render() {
    return (
      <div style={styles.wrapper}>
        {this.props.chips.map((chip, idx) => this.renderChip(chip, idx))}
      </div>
    );
  }
}
