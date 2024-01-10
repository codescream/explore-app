import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core'

import Post from './post/Post';
import postsStyles from './styles';

const Posts = () => {
  const posts = useSelector(state => state.postsReducer.data);

  console.log(posts);
  
  const classes = postsStyles();
  
  return (
    <>
      {
        !posts.length ? <CircularProgress /> :
        (
          <Grid
            className={classes.mainContainer}
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
                  sm={6}
                >
                  <Post post={post} />
                </Grid>
              ))
            }
          </Grid>
        )
      }
    </>
  )
}

export default Posts;