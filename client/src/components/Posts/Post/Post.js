import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../redux/actions/posts';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import classes from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <Card sx={classes.card}>
      <CardMedia
        sx={classes.media}
        image={
          post.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={post.title}
      />
      <Box sx={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Box>
      <Box sx={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </Box>

      <Box sx={classes.details}>
        <Typography variant="body" color="primary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </Box>
      <Typography sx={classes.title} gutterBottom variant="h5" component="h2">
        {post.title}
      </Typography>

      <CardContent sx={{ height: '10vh' }}>
        <Typography variant="body2" component="p" color="textSecondary">
          {post.message.length > 60
            ? `${post.message.substring(0, 60)}...`
            : post.message}
        </Typography>
      </CardContent>

      <CardActions sx={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <ThumbUpAltIcon fontSize="small" /> &nbsp; Like &nbsp;{' '}
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
