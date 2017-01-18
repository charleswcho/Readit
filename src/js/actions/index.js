export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_SUBREDDIT = 'ADD_SUBREDDIT'
export const REMOVE_SUBREDDIT = 'REMOVE_SUBREDDIT'

export const addSubReddit = reddit => ({
  type: ADD_SUBREDDIT,
  reddit
})

export const removeSubReddit = idx => ({
  type: REMOVE_SUBREDDIT,
  idx
})

export const requestPosts = () => ({
  type: REQUEST_POSTS
})

export const receivePosts = json => ({
  type: RECEIVE_POSTS,
  posts: json.data.children.map(child => child.data)
})

export const fetchPosts = reddit => dispatch => {
  let url = `https://www.reddit.com/hot.json`

  if (reddit) {
    url = `https://www.reddit.com/r/${reddit}.json`
  }

  dispatch(requestPosts())
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
    .catch(e => console.log(e))
}
