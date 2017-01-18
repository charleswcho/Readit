import { combineReducers } from 'redux'
import {
  ADD_SUBREDDIT, REMOVE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS } from '../actions'

const subReddits = (state = [], action) => {
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

const postsByReddit = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
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
