import React, { PropTypes } from 'react'

const Posts = ({posts}) => (
  <ul className='posts'>
    {posts.map((post, idx) => Post(post, idx))}
  </ul>
)

const Post = (post, idx) => {
  return (
    <li key={idx} className='post'>
      {First(post, idx)}
      {Second(post)}
    </li>
  )
}


const First = (post, idx) => {
  let img = <i id='defaut' className="fa fa-book fa-4x" aria-hidden="true"></i>

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

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
