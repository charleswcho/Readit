import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addSubReddit, removeSubReddit, fetchPosts } from '../actions'
import SubInput from './SubInput'
import SubRedditChip from './SubRedditChip'

import Posts from './Posts'

import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
  static propTypes = {
    subReddits: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts('reactjs'))
  }

  handleSubmit = nextReddit => {
    const { dispatch } = this.props

    dispatch(addSubReddit(nextReddit))
    dispatch(fetchPosts(nextReddit))
  }

  handleDelete = () => {
    let name = this.children

    this.props.dispatch(removeSubReddit(name))
  }

  render() {
    const { subReddits, posts, isFetching } = this.props
    const isEmpty = posts.length === 0

    return (
      <div>
        <SubInput handleSubmit={this.handleSubmit} />

        {subReddits.map((subreddit, idx) => {
          return (
            <SubRedditChip key={idx} name={subreddit} handleDelete={this.handleDelete} />
          )
        })}

        {isEmpty ? (isFetching ? <CircularProgress /> : <h2>Empty.</h2>) : <Posts posts={posts} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { subReddits, postsByReddit } = state
  const { isFetching, items: posts } = postsByReddit || { isFetching: true, items: [] }

  return {
    subReddits,
    posts,
    isFetching
  }
}

export default connect(mapStateToProps)(App)
