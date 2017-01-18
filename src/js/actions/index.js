export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_SUBREDDIT = 'ADD_SUBREDDIT'
export const REMOVE_SUBREDDIT = 'REMOVE_SUBREDDIT'

export const addSubReddit = reddit => ({
  type: ADD_SUBREDDIT,
  reddit
})

export const removeSubReddit = reddit => ({
  type: REMOVE_SUBREDDIT,
  reddit
})

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

export const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit))
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
    .catch(e => console.log(e))
}
