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
            style={styles.chip}
            onRequestDelete={() => this.props.handleDelete(idx)}>
        {chip}
      </Chip>
    );
  }

  render() {
    if (this.props.chips.length > 0) {
      return (
        <div className='chips' style={styles.wrapper}>
          {this.props.chips.map((chip, idx) => this.renderChip(chip, idx))}
        </div>
      );
    } else {
      return null
    }
  }
}
