import React from 'react';
import { useSelector } from 'react-redux';

import Post from './post/Post';

const Posts = () => {
  const posts = useSelector(state => state.postsReducer);
  
  console.log(posts);
  
  return (
    <>
      <h2>All Posts</h2>
      <Post />
      <Post />
    </>
  )
}

export default Posts;