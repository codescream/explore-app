import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import { motion } from 'framer-motion';

import Post from './post/Post';
import postsStyles from './styles';
import PostDetails from './postDetails/PostDetails';

const Posts = () => {
  const posts = useSelector(state => state.postsReducer.data);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  


  const classes = postsStyles();

  // useEffect(() => {
  //   first
  
  // }, [showDetails])

  
  document.body.style.overflow = showDetails ? 'hidden' : '';
  
  return (
    <>
      {
        !posts?.length ? <CircularProgress color='inherit' /> :
        (
          <Grid
            // className={classes.container}
            container
            alignItems='stretch'
            spacing={3}
          >
            {
              posts.map(post => (
                <Grid
                  item
                  key={post._id}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={3}
                >
                  <motion.div
                    onClick={() => {setShowDetails(true); setSelectedPost(post)}}
                    layoutId={post._id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ height: '100%' }}
                  >
                    <Post post={post} />
                  </motion.div>
                </Grid>
              ))
            }
            <PostDetails setShowDetails={setShowDetails} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
          </Grid>
        )
      }
    </>
  )
}

export default Posts;