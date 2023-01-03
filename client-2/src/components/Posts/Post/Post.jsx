import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../../redux/actions/posts';

import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import classes from './styles';

const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);

	const Likes = () => {
		if (post['likes'] !== undefined && post.likes.length > 0) {
			return post.likes.find((like) => like === user?._id) ? (
				<div
					style={{
						maxHeight: '200px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
				</div>
			) : (
				<div
					style={{
						maxHeight: '200px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ThumbUpAltOutlined fontSize='small' />
						&nbsp;{post.likes.length}{' '}
						{post.likes.length === 1 ? 'Like' : 'Likes'}
					</div>
				</div>
			);
		}
		return (
			<div
				style={{
					maxHeight: '200px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</div>
		);
	};

	const openPost = () => {
		navigate(`/posts/${post._id}`);
	};

	return (
		<Card sx={classes.card} raised elevation={6}>
			<ButtonBase sx={classes.cardAction} onClick={openPost}>
				<CardMedia
					sx={classes.media}
					image={
						post.selectedFile ||
						'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
					}
					title={post.title}
				/>
				<Box sx={classes.overlay}>
					<Typography variant='p'>{post.name}</Typography>
					<Typography variant='body2'>
						{moment(post.createdAt).fromNow()}
					</Typography>
				</Box>
				{user?._id === post?.creator && (
					<Box sx={classes.overlay2}>
						<Button
							onClick={(e) => {
								e.stopPropagation();
								setCurrentId(post._id);
							}}
							style={{ color: 'white' }}
							size='small'
						>
							<MoreHorizIcon fontSize='default' />
						</Button>
					</Box>
				)}

				<Box sx={classes.details}>
					<Typography variant='body' color='primary'>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
				</Box>
				<Typography
					sx={classes.title}
					gutterBottom
					variant='h6'
					component='h2'
					fontSize={20}
				>
					{post.title.length > 15
						? `${post.title.substring(0, 15)}...`
						: post.title}
				</Typography>

				<CardContent sx={{ height: '10vh' }}>
					<Typography variant='body2' component='p' color='textSecondary'>
						{post.message.length > 50
							? `${post.message.substring(0, 40)}...`
							: post.message}
					</Typography>
				</CardContent>
			</ButtonBase>
			<CardActions sx={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					disabled={!user}
					onClick={() => {
						dispatch(likePost(post._id));
					}}
				>
					<Likes />
				</Button>
				{user?._id === post?.creator && (
					<Button
						size='small'
						color='error'
						onClick={() => {
							dispatch(deletePost(post._id));
						}}
					>
						<DeleteIcon fontSize='small' /> Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
