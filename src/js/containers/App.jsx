import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addSubReddit, removeSubReddit,
         fetchPosts } from '../actions'

import FilterTabs from './FilterTabs'

import SubInput from './components/SubInput'
import ChipIndex from './components/ChipIndex'
import Posts from './components/Posts'

import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
  static propTypes = {
    subReddits: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

  componentWillReceiveProps({ subReddits }) {
    const { dispatch } = this.props

    if (this.props.subReddits.length !== subReddits.length) {
      if (subReddits.length > 0) {
        dispatch(fetchPosts(subReddits.join('+')))
      } else {
        dispatch(fetchPosts())
      }
    }
  }

  handleSubmit = newSubReddit => {
    this.props.dispatch(addSubReddit(newSubReddit))
  }

  handleDelete = idx => {
    this.props.dispatch(removeSubReddit(idx))
  }

  render() {
    const { subReddits, posts, isFetching } = this.props
    const isEmpty = posts.length === 0

    return (
      <div>
        <SubInput handleSubmit={this.handleSubmit} />

        <ChipIndex chips={subReddits} handleDelete={this.handleDelete} />

        <FilterTabs />

        {isEmpty ? (isFetching ? <CircularProgress /> : <h2>Empty.</h2>) : <Posts posts={posts} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { subReddits, redditPosts } = state
  const { isFetching, posts } = redditPosts || { isFetching: true, posts: [] }

  return {
    subReddits,
    posts,
    isFetching
  }
}

export default connect(mapStateToProps)(App)
