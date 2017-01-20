import React, { PropTypes } from 'react'

const First = (post, idx) => {
  let img = <div className='thumbnail'><i className="fa fa-book fa-4x" aria-hidden="true"/></div>

  const { thumbnail, ups } = post

  if (thumbnail !== 'self' && thumbnail !== 'default' && thumbnail !== 'nsfw') {
    img = <img className='thumbnail' src={thumbnail} alt='thumbnail'/>
  }

  return (
    <div className='first'>
      <div className='idx'>{idx+1}</div>
      <div className='upvotes'>{ups.toLocaleString()}</div>
      {img}
    </div>
  )
}

const Second = (post) => {
  const { url, title, author, subreddit } = post

  return (
    <div className='second'>
      <div className='title'><a href={url}>{title}</a></div>
      <div className='under'>
        <div className='author'><span>by </span>
          <a href={`https://www.reddit.com/user/${author}`}>{author}</a>
        </div>
        <div className='subreddit'><span>to </span>
          <a href={`https://www.reddit.com/r/${subreddit}`}>{subreddit}</a>
        </div>
      </div>
    </div>
  )
}

const Post = (post, idx) => {
  return (
    <li key={idx} className='post'>
      {First(post, idx)}
      {Second(post)}
    </li>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired
}

export default Post
