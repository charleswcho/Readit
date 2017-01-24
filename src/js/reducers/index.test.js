import * as reducers from './index'

import * as types from '../actions/index'

describe('Subreddits reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.subReddits(undefined, {}))
      .toEqual([])
  })

  it('should handle ADD_SUBREDDIT', () => {
    expect(
      reducers.subReddits([], { type: types.ADD_SUBREDDIT, reddit: 'awww'}))
      .toEqual(['awww'])
  })

  it('should handle REMOVE_SUBREDDIT', () => {
    expect(
      reducers.subReddits(['awww'], { type: types.REMOVE_SUBREDDIT, idx: 0 }))
      .toEqual([])
  })
})

/* Constants for testing filtering posts */

const posts = [
  { created_utc: 1, ups: 4 },
  { created_utc: 2, ups: 3 },
  { created_utc: 3, ups: 2 },
  { created_utc: 2, ups: 3 }
]

// Posts after filtering
const expectedPosts = {
  hot: posts,
  new: [
    { created_utc: 3, ups: 2 },
    { created_utc: 2, ups: 3 },
    { created_utc: 2, ups: 3 },
    { created_utc: 1, ups: 4 }
  ],
  top: [
    { created_utc: 1, ups: 4 },
    { created_utc: 2, ups: 3 },
    { created_utc: 2, ups: 3 },
    { created_utc: 3, ups: 2 }
  ]
}

describe('Filter Posts', () => {
  it('should return posts sorted three different ways', () => {
    expect(reducers.filterPosts(posts))
      .toEqual(expectedPosts)
  })
})

describe('Posts reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.redditPosts(undefined, {}))
      .toEqual({ isFetching: false, posts: [] })
  })

  it('should handle REQUEST_POSTS', () => {
    expect(
      reducers.redditPosts(
        { isFetching: false, posts: [] },
        { type: types.REQUEST_POSTS }))
      .toEqual({ isFetching: true, posts: [] })
  })

  it('should handle RECEIVE_POSTS', () => {
    expect(
      reducers.redditPosts(
        { isFetching: true, posts: [] },
        { type: types.RECEIVE_POSTS, posts: posts }))
      .toEqual({ isFetching: false, posts: posts, filtered: expectedPosts })
  })

  /* Filtering posts tests */

  it('should handle FILTER_HOT', () => {
    expect(
      reducers.redditPosts(
        { filtered: expectedPosts },
        { type: types.FILTER_HOT }))
      .toEqual({ filtered: expectedPosts, posts: expectedPosts.hot })
  })

  it('should handle FILTER_NEW', () => {
    expect(
      reducers.redditPosts(
        { filtered: expectedPosts },
        { type: types.FILTER_NEW }))
      .toEqual({ filtered: expectedPosts, posts: expectedPosts.new })
  })

  it('should handle FILTER_TOP', () => {
    expect(
      reducers.redditPosts(
        { filtered: expectedPosts },
        { type: types.FILTER_TOP }))
      .toEqual({ filtered: expectedPosts, posts: expectedPosts.top })
  })
})
