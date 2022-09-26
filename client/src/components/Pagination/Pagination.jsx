import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from '@mui/material';

import classes from './styles';

const Paginate = () => {
	return (
		<Pagination
			classes={{ ul: classes.ul }}
			count={5}
			page={1}
			variant='outlined'
			color='primary'
			renderItem={(item) => (
				<PaginationItem {...item} component={Link} to={`/post?page=${1}`} />
			)}
		/>
	);
};

export default Paginate;
