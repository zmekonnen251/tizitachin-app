import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';
import classes from './styles';

const Paginate = ({ page }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (page) dispatch(getPosts(page));
	}, [dispatch, page]);

	const { numberOfPages } = useSelector((state) => state.posts);
	return (
		<Pagination
			classes={{ ul: classes.ul }}
			count={numberOfPages}
			page={Number(page) || 1}
			variant='outlined'
			color='primary'
			renderItem={(item) => (
				<PaginationItem
					{...item}
					component={Link}
					to={`/posts?page=${item.page}`}
				/>
			)}
		/>
	);
};

export default Paginate;
