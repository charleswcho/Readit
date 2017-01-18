import { combineReducers } from 'redux'
import {
  ADD_SUBREDDIT, REMOVE_SUBREDDIT,
  FETCH_POSTS, RECEIVE_POSTS } from '../actions'

const subReddits = (state = ['reactjs'], action) => {
  switch (action.type) {
    case ADD_SUBREDDIT:
      return state.concat(action.reddit)
    case REMOVE_SUBREDDIT:
      const idx = state.indexOf(action.reddit)

      return [...state].splice(idx, 1)
    default:
      return state
  }
}

const postsByReddit = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  subReddits
})

export default rootReducer
