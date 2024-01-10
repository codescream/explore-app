import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import postStyles from './styles';

const Post = ({ post }) => {
  const classes = postStyles();
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
          size='small' onClick={() => {}}
        >
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography
          variant='body2'
          color='textSecondary'
        >
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <CardContent>
        <Typography
          className={classes.title}
          variant='h5'
          gutterBottom
        >
          {post.message.length > 20 ? `${post.message.substring(0, 20)}...` : post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={() => {}}>
          <ThumbUpAltIcon fontSize='small' />
          {post.likeCount}
        </Button>
        <Button size='small' color='primary' onClick={() => {}}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post;