import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';

import Post from './Post/Post';
import classes from './styles';

const Posts = ({ setCurrentId }) => {
	const { posts, isLoading } = useSelector((state) => state.posts);

	if (!posts?.length && !isLoading) return 'No posts';

	return posts && isLoading ? (
		<CircularProgress />
	) : (
		<Grid container spacing={2} sx={classes.mainContainer} alignItems='stretch'>
			{posts.map((post) => (
				<Grid key={post._id} item xs={12} sm={12} md={12} lg={3}>
					<Post post={post} setCurrentId={setCurrentId} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
