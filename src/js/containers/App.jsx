import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addSubReddit, removeSubReddit, fetchPosts } from '../actions';

import FilterTabs from './FilterTabs';

import SubInput from '../components/SubInput';
import ChipIndex from '../components/ChipIndex';
import Posts from '../components/Posts';

import CircularProgress from '@material-ui/core/CircularProgress';

class App extends Component {
  static propTypes = {
    subReddits: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  componentWillReceiveProps({ subReddits }) {
    const { dispatch } = this.props;

    // Only fetch new posts if a subreddit was added or removed
    if (this.props.subReddits.length !== subReddits.length) {
      // If subreddit tags already exist we add on the new subreddit and make
      // a new query.  We then fetch new posts based on the new query.
      if (subReddits.length > 0) {
        dispatch(fetchPosts(subReddits.join('+')));
      } else {
        // If there are no subreddit tags we fetch the default front page of Reddit
        dispatch(fetchPosts());
      }
    }
  }

  /**
   * Handlers for Adding and Removing subreddits from state
   */

  handleSubmit = newSubReddit => {
    this.props.dispatch(addSubReddit(newSubReddit));
  };

  handleDelete = idx => {
    this.props.dispatch(removeSubReddit(idx));
  };

  render() {
    const { subReddits, posts, isFetching } = this.props;
    const isEmpty = posts.length === 0;

    return (
      <div className="app">
        <h1 className="app-header">Readit</h1>

        <SubInput handleSubmit={this.handleSubmit} />

        <ChipIndex chips={subReddits} handleDelete={this.handleDelete} />

        <FilterTabs />

        {isEmpty ? (
          isFetching ? (
            <div className="loading-container">
              <CircularProgress />
            </div>
          ) : (
            <h2>Empty.</h2>
          )
        ) : (
          <Posts posts={posts} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { subReddits, redditPosts } = state;

  // If redditPosts doesn't currently exist we assume that they are getting fetched
  const { isFetching, posts } = redditPosts || { isFetching: true, posts: [] };

  return {
    subReddits,
    posts,
    isFetching
  };
};

export default connect(mapStateToProps)(App);
