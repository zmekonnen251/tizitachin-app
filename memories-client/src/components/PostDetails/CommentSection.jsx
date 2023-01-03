import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Box } from '@mui/material';
import { commentPost } from '../../redux/actions/posts';
import classes from './styles';

const CommentSection = ({ post }) => {
	const user = useSelector((state) => state.auth.user);
	const [comment, setComment] = useState('');
	const dispatch = useDispatch();
	const [comments, setComments] = useState(post?.comments);
	const commentsRef = useRef();

	const handleComment = async () => {
		const newComments = await dispatch(
			commentPost(`${user?.name}: ${comment}`, post._id)
		);

		setComment('');
		setComments(newComments);

		commentsRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<Box>
			<Box sx={classes.commentsOuterContainer}>
				<Box sx={classes.commentsInnerContainer}>
					<Typography gutterBottom variant='h6'>
						Comments
					</Typography>
					{comments?.map((c, i) => {
						const name =
							c.split(':')[0] !== 'undefined' ? c.split(':')[0] : 'Anonymous';
						const comment = c.split(':')[1];
						return (
							<Typography key={i} gutterBottom variant='subtitle1'>
								<strong>{name}</strong>
								{comment}
							</Typography>
						);
					})}
					<div ref={commentsRef} />
				</Box>
				{user?.name && (
					<Box sx={{ width: '70%' }}>
						<Typography gutterBottom variant='h6'>
							Write a comment
						</Typography>
						<TextField
							fullWidth
							rows={4}
							variant='outlined'
							label='Comment'
							multiline
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<br />
						<Button
							style={{ marginTop: '10px' }}
							fullWidth
							disabled={!comment.length}
							color='primary'
							variant='contained'
							onClick={handleComment}
						>
							Comment
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default CommentSection;
