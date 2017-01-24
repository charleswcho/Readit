import { combineReducers } from 'redux'
import {
  ADD_SUBREDDIT, REMOVE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS,
  FILTER_HOT, FILTER_NEW, FILTER_TOP
} from '../actions'

/* Subreddits Reducer */
export const subReddits = (state = [], action) => {
  switch (action.type) {
    case ADD_SUBREDDIT:
      return state.concat(action.reddit)
    case REMOVE_SUBREDDIT:
      let newState = [...state]

      newState.splice(action.idx, 1)

      return newState
    default:
      return state
  }
}

/**
 * Filters posts received from Reddit
 * @param {Array.<Object>} posts - Posts received from Reddit
 * @returns {Object.<string, Array>} filterd - Posts filtered by time and upvotes
 */

export const filterPosts = (posts) => {
  let filtered = { hot: [...posts] }

  filtered.new = [...posts].sort((a, b) => b.created_utc - a.created_utc)
  filtered.top = [...posts].sort((a, b) => b.ups - a.ups)

  return filtered
}

/* Posts Reducer */
export const redditPosts = (state = { isFetching: false, posts: [] }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {...state, isFetching: true}
    case RECEIVE_POSTS:
      return {...state, isFetching: false, posts: action.posts, filtered: filterPosts(action.posts)}
    case FILTER_HOT:
      return {...state, posts: state.filtered.hot}
    case FILTER_NEW:
      return {...state, posts: state.filtered.new}
    case FILTER_TOP:
      return {...state, posts: state.filtered.top}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  redditPosts,
  subReddits
})

export default rootReducer
