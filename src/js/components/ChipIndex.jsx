import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

export default class ChipIndex extends Component {
  static propTypes = {
    handleDelete: PropTypes.func.isRequired,
    chips: PropTypes.array.isRequired
  };

  renderChip = (chip, idx) => {
    return (
      <Chip
        key={idx}
        label={chip}
        onDelete={() => this.props.handleDelete(idx)}
      />
    );
  };

  render() {
    if (this.props.chips.length > 0) {
      return (
        <div className="chips" style={styles.wrapper}>
          {this.props.chips.map((chip, idx) => this.renderChip(chip, idx))}
        </div>
      );
    } else {
      return null;
    }
  }
}
