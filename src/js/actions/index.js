/* Subreddit constants */
export const ADD_SUBREDDIT = 'ADD_SUBREDDIT';
export const REMOVE_SUBREDDIT = 'REMOVE_SUBREDDIT';

/* Posts constants */
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const FILTER_HOT = 'FILTER_HOT';
export const FILTER_NEW = 'FILTER_NEW';
export const FILTER_TOP = 'FILTER_TOP';

/* Subreddit actions */
export const addSubReddit = reddit => ({
  type: ADD_SUBREDDIT,
  reddit
});

export const removeSubReddit = idx => ({
  type: REMOVE_SUBREDDIT,
  idx
});

/* Posts actions */
export const requestPosts = () => ({
  type: REQUEST_POSTS
});

export const receivePosts = json => ({
  type: RECEIVE_POSTS,
  posts: json.data.children.map(child => child.data)
});

export const fetchPosts = reddit => dispatch => {
  // default url (front page of Reddit)
  let url = 'https://www.reddit.com/hot.json';
  // If subreddits exist we make a custom url
  if (reddit) {
    url = `https://www.reddit.com/r/${reddit}.json`;
  }

  dispatch(requestPosts());

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
    .catch(e => {
      alert('Invalid query');
    });
};

/* Filter Posts actions */

export const filterHot = () => ({
  type: FILTER_HOT
});

export const filterNew = () => ({
  type: FILTER_NEW
});

export const filterTop = () => ({
  type: FILTER_TOP
});
