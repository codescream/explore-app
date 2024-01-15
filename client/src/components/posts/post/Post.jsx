import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { post_id } from '../../../redux/reducers/allState';
import { useDispatch } from 'react-redux';

import postStyles from './styles';
import { delete_post, update_post } from '../../../redux/reducers/posts';

const Post = ({ post }) => {
  const classes = postStyles();
  const dispatch = useDispatch();

  const stopBubble = (e) => {
    e.stopPropagation();
  }

  return (
    <Card
      className={classes.card}
    >
      <CardMedia 
        className={classes.media}
        image={post.selectedFile.length ? post.selectedFile[0] : ''}
        title={post.title}
      />
      <div
        className={classes.overlay}
      >
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}}
          size='small' onClick={(e) => {stopBubble(e); dispatch(post_id(post._id))}}
        >
          <MoreHorizIcon fontSize='medium' />
        </Button>
      </div>
      <div className={classes.details}>
        {
          post.tags.map((tag, index) => 
          <Button
          color='primary'
          style={{ fontSize: '7px', padding: '2px 1px' }}
          key={`${tag}-${index}`}
          onClick={stopBubble}
          >
            {`#${tag}`}
          </Button>
        )}
      </div>
      <div className={classes.title}>
        <Typography
          variant='h6'
        >
          {post.title}
        </Typography>
      </div>
      <CardContent>
        <Typography
          variant='body2'
          gutterBottom
          color="textSecondary"
          component="p"
        >
          {post.message.length > 50 ? `${post.message.substring(0, 50)}...` : post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={(e) => {stopBubble(e); dispatch(update_post({ postId:post._id, postData: {...post, likeCount: post.likeCount + 1} }))}}>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp; LIKE &nbsp;
          {post.likeCount}
        </Button>
        <Button size='small' color='primary' onClick={(e) => {stopBubble(); dispatch(delete_post(post._id))}}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post;