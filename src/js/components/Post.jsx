import React, { PropTypes } from 'react'

const Post = (post, idx) => {
  return (
    <li key={idx} className='post'>
      {First(post, idx)}
      {Second(post)}
    </li>
  )
}

const First = (post, idx) => {
  let img = <div className='thumbnail'><i className="fa fa-book fa-4x" aria-hidden="true"/></div>

  if (post.thumbnail !== 'self' && post.thumbnail !== 'default') {
    img = <img className='thumbnail' src={post.thumbnail} alt='thumbnail'/>
  }

  return (
    <div className='first'>
      <div className='idx'>{idx+1}</div>
      <div className='upvotes'>{post.ups.toLocaleString()}</div>
      {img}
    </div>
  )
}

const Second = (post) => {
  return (
    <div className='second'>
      <div className='title'><a href={post.url}>{post.title}</a></div>
      <div className='under'>
        <div className='author'><span>by </span>
          <a href={`https://www.reddit.com/user/${post.author}`}>{post.author}</a>
        </div>
        <div className='subreddit'><span>to </span>
          <a href={`https://www.reddit.com/r/${post.subreddit}`}>{post.subreddit}</a>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired
}

export default Post
