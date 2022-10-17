import React, { useEffect } from 'react';
import {
	Paper,
	Typography,
	CircularProgress,
	Divider,
	Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../redux/actions/posts';
import CommentSection from './CommentSection';
import classes from './styles.js';

const PostDetails = () => {
	const { post, posts, isLoading } = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getPost(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (post) {
			dispatch(
				getPostsBySearch({ searchTerm: 'none', tags: post?.tags.join(',') })
			);
		}
	}, [dispatch, post]);

	if (!post) return null;

	if (isLoading) {
		return (
			<Paper elevation={6} sx={classes.loadingPaper}>
				<CircularProgress size='7em' />
			</Paper>
		);
	}

	const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
	const openPost = (_id) => navigate(`/posts/${_id}`);

	return (
		<Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
			<Box sx={classes.card}>
				<Box sx={classes.section}>
					<Typography variant='h6' component='h2'>
						{post.title}
					</Typography>
					<Typography
						gutterBottom
						variant='subtitle2'
						color='textSecondary'
						component='h2'
					>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
					<Typography gutterBottom variant='body1' component='p'>
						{post.message}
					</Typography>
					<Typography variant='h6'>Created by: {post.name}</Typography>
					<Typography variant='body1'>
						{moment(post.createdAt).fromNow()}
					</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Typography variant='body1'>
						<strong>Realtime Chat - coming soon!</strong>
					</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<CommentSection post={post} />
					<Divider style={{ margin: '20px 0' }} />
				</Box>
				<Box sx={classes.imageSection}>
					<img
						style={{
							maxWidth: '700px',
							maxheight: '200px',
							borderRadius: '20px',
							objectFit: 'cover',
						}}
						src={
							post.selectedFile ||
							'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
						}
						alt={post.title}
					/>
				</Box>
			</Box>
			{!!recommendedPosts.length && (
				<Box sx={classes.section}>
					<Typography gutterBottom variant='h5'>
						You might also like:
					</Typography>
					<Divider />
					<Box sx={classes.recommendedPosts}>
						{recommendedPosts.map(
							({ title, name, message, likes, selectedFile, _id }) => (
								<Box
									style={{ margin: '20px', cursor: 'pointer' }}
									onClick={() => openPost(_id)}
									key={_id}
								>
									<Typography gutterBottom variant='h6'>
										{title}
									</Typography>
									<Typography gutterBottom variant='subtitle2'>
										{name}
									</Typography>
									<Typography gutterBottom variant='subtitle2'>
										{message}
									</Typography>
									<Typography gutterBottom variant='subtitle1'>
										Likes: {likes.length}
									</Typography>
									<img
										src={
											selectedFile ||
											'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
										}
										alt={title}
										width='200px'
									/>
								</Box>
							)
						)}
					</Box>
				</Box>
			)}
		</Paper>
	);
};

export default PostDetails;
