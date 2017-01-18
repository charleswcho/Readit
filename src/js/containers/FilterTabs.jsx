import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { filterHot, filterNew, filterTop } from '../actions'

import {Tabs, Tab} from 'material-ui/Tabs';

class FilterTabs extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  handleActive = (e) => {
    const { dispatch } = this.props

    switch (e.props.index) {
      case 0:
        dispatch(filterHot())
        break
      case 1:
        dispatch(filterNew())
        break
      case 2:
        dispatch(filterTop())
        break
      default:
        console.log('No action Called')
        break
    }
  }

  render() {
    return (
      <Tabs>
        <Tab label="Hot" onActive={this.handleActive} />
        <Tab label="New" onActive={this.handleActive} />
        <Tab label="Top" onActive={this.handleActive} />
      </Tabs>
    )
  }
};

export default connect()(FilterTabs);
