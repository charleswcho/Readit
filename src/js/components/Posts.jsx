import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const Posts = ({ posts }) => (
  <ul className="posts">{posts.map((post, idx) => Post(post, idx))}</ul>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Posts;
