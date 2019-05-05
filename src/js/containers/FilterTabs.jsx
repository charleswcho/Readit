import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { filterHot, filterNew, filterTop } from '../actions';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class FilterTabs extends Component {
  state = {
    tab: 'hot'
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  handleChange = (_, newValue) => {
    const { dispatch } = this.props;

    this.setState({ tab: newValue });

    switch (newValue) {
      case 'hot':
        dispatch(filterHot());
        break;
      case 'new':
        dispatch(filterNew());
        break;
      case 'top':
        dispatch(filterTop());
        break;
      default:
        console.log('No action Called');
        break;
    }
  };

  render() {
    const { tab } = this.state;

    return (
      <AppBar position="static">
        <Tabs value={tab} onChange={this.handleChange} centered>
          <Tab value="hot" label="Hot" />
          <Tab value="new" label="New" />
          <Tab value="top" label="Top" />
        </Tabs>
      </AppBar>
    );
  }
}

export default connect()(FilterTabs);
