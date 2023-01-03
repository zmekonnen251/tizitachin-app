import React, { useState } from 'react';
import {
	Container,
	Grow,
	Grid,
	Paper,
	AppBar,
	TextField,
	Button,
	Autocomplete,
	Chip,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostsBySearch } from '../../redux/actions/posts';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination/Pagination';
import classes from './styles.js';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Home = () => {
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();
	const query = useQuery();
	const navigate = useNavigate();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const [searchTerm, setSearchTerm] = useState('');
	const [tags, setTags] = useState([]);

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const searchPost = () => {
		if (searchTerm.trim() || tags) {
			dispatch(getPostsBySearch({ searchTerm, tags: tags.join(',') }));
			navigate(
				`/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(
					','
				)}`
			);
		} else {
			navigate('/');
		}
	};

	return (
		<Grow in>
			<Container maxWidth='xl'>
				<Grid
					container
					justifyContent='space-between'
					alignItems='stretch'
					spacing={3}
					sx={classes.gridContainer}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppBar
							sx={classes.appBarSearch}
							position='static'
							color='inherit'
							elevation={6}
						>
							<TextField
								sx={classes.searchInput}
								name='search'
								variant='outlined'
								label='Search Memories'
								onKeyPress={handleKeyPress}
								fullWidth
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>

							<Autocomplete
								sx={classes.searchInputTags}
								multiple
								onChange={(e, value) => setTags((state) => value)}
								// id='tags-filled'
								options={tags.map((option) => option)}
								// defaultValue={[top100Films[13].title]}
								freeSolo
								renderTags={(value, getTagProps) =>
									value.map((option, index) => (
										<Chip
											variant='outlined'
											label={option}
											{...getTagProps({ index })}
										/>
									))
								}
								renderInput={(params) => (
									<TextField
										{...params}
										variant='outlined'
										label='Search Tags'
										placeholder='Search Tags'
									/>
								)}
							/>

							<Button variant='contained' color='primary' onClick={searchPost}>
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						{!searchQuery && !tags.length && (
							<Paper sx={classes.pagination} elevation={6}>
								<Pagination page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
