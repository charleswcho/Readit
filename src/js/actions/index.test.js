import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('subreddit actions', () => {
  it('should create an action to add a subbreddit', () => {
    const reddit = 'awww';
    const expectedAction = {
      type: actions.ADD_SUBREDDIT,
      reddit
    };
    expect(actions.addSubReddit(reddit)).toEqual(expectedAction);
  });

  it('should create an action to remove a subbreddit', () => {
    const idx = 0;
    const expectedAction = {
      type: actions.REMOVE_SUBREDDIT,
      idx
    };
    expect(actions.removeSubReddit(idx)).toEqual(expectedAction);
  });
});

describe('posts actions', () => {
  it('should create an action to request posts', () => {
    const expectedAction = {
      type: actions.REQUEST_POSTS
    };
    expect(actions.requestPosts()).toEqual(expectedAction);
  });

  it('should create an action to receive posts and parse data', () => {
    const json = { data: { children: [{ data: { name: 'post0' } }] } },
      posts = [{ name: 'post0' }];
    const expectedAction = {
      type: actions.RECEIVE_POSTS,
      posts
    };
    expect(actions.receivePosts(json)).toEqual(expectedAction);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates RECEIVE_POSTS when fetching posts is done', () => {
    nock('http://www.google.com')
      .get('/')
      .reply(200, { data: { children: [{ data: { name: 'post0' } }] } });

    const expectedActions = [
      { type: actions.REQUEST_POSTS },
      { type: actions.RECEIVE_POSTS, posts: [{ name: 'post0' }] }
    ];

    console.log(expectedActions);

    const store = mockStore({ posts: [] });

    return store.dispatch(actions.fetchPosts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create filter actions', () => {
    const expectedAction = [
      { type: actions.FILTER_HOT },
      { type: actions.FILTER_NEW },
      { type: actions.FILTER_TOP }
    ];

    const store = mockStore();

    store.dispatch(actions.filterHot());
    store.dispatch(actions.filterNew());
    store.dispatch(actions.filterTop());

    expect(store.getActions()).toEqual(expectedAction);
  });
});
