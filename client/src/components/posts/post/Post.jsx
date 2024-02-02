import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { post_id } from '../../../redux/reducers/allState';
import { useDispatch } from 'react-redux';

import postStyles from './styles';
import { delete_post, like_post } from '../../../redux/reducers/posts';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  const classes = postStyles();
  const id = JSON.parse(localStorage.getItem('profile'))?._id;
  const [like, setLike] = useState(post.likes.includes(id));
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stopBubble = (e) => {
    e.stopPropagation();
  }

  const handleLikes = (e) => {
    e.stopPropagation();

    if(!localStorage.getItem('profile')) {
      navigate('/auth', { replace: true});
      return;
    }

    let likePost = [];
    if(post.likes.includes(`${id}`)) {
      setLike(false);
      likePost = [...post.likes.filter(like => like !== id)];
    }else {
      setLike(true);
      likePost =  [...post.likes, id];
    }
    dispatch(like_post({ postId:post._id, postData: { ...post, likes: [ ...likePost ]} }));
  }

  return (
    <Card
      className={classes.card}
      raised
      elevation={6}
    >
      <CardMedia 
        className={classes.media}
        image={post.selectedFile.length ? post.selectedFile[0] : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
        title={post.title}
      />
      <div
        className={classes.overlay}
      >
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}}
          size='small' onClick={(e) => {stopBubble(e); dispatch(post_id(post._id))}}
          disabled={post.creator_id !== id}
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
        <Button size='small' color='primary' onClick={handleLikes}>
          {
            like ? <ThumbUpAltIcon fontSize='small' /> : <ThumbUpOutlinedIcon fontSize='small' />
          }
          
          &nbsp; LIKE &nbsp;
          {post.likes.length}
        </Button>
        <Button size='small' color='secondary' disabled={post.creator_id !== id} 
          onClick={(e) => {stopBubble(e); 
          dispatch(post_id(null));
          dispatch(delete_post(post._id))}}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post;