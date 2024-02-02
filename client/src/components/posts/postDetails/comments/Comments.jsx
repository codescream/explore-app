import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import commentStyles from './styles'
import { add_comment } from '../../../../redux/reducers/posts';

const Comments = ({ post }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post?.comments);

  const filter = useSelector(state => state.postsReducer.data.find(item => item._id === post._id))

  useEffect(() => {
    setComments(filter.comments)
  
  }, [filter])

  const dispatch = useDispatch();

  const classes = commentStyles();

  const handleComment = async () => {
    if(comment.trim() !== '') {
      const user = JSON.parse(localStorage.getItem('profile'));

      dispatch(add_comment({ id: post?._id, comment: {username: user.name, comment: comment} }));

      setComment('');
    }
  }

  return (
    <motion.div
      style={{ width: '90%'}}
    >
      <Typography>Comments:</Typography>
      <Divider style={{ height: '3px', color: 'black'}} />
      <Grid 
        container
        wrap='wrap'
        spacing={2}
        className={classes.commentsContainer}
      >
        <Grid item
          md={7}
          xs={12}
          style={{ maxHeight: '300px', overflowY: 'scroll', borderBottom: '3px solid rgba(0, 0, 0, 0.12)' }}
        >
          {
            comments?.map((c, i) => 
            (<Typography key={i}>
              <span style={{ fontWeight: 'bold' }}>
                {c.username}
              </span>
              {`: ${c.comment}`}
            </Typography>
            ))
          }
        </Grid>
        <Grid item
          md={5}
          xs={12}
          style={{ }}
        >
          <Paper
            elevation={3}
            style={{ marginBottom: '10px' }}
          >
            <TextField 
              fullWidth
              label="Drop A Comment..."
              maxRows={11}
              minRows={11}
              variant='outlined'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Paper>
          <Button
            variant='contained'
            fullWidth
            color='primary'
            onClick={handleComment}
          >Comment</Button>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default Comments;