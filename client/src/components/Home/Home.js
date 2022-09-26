import React, { useEffect, useState } from 'react';
import {
	Container,
	Grow,
	Grid,
	Paper,
	AppBar,
	TextField,
	Button,
} from '@mui/material';
import ChipInput from 'material-ui-chip-input';

import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../redux/actions/posts';
import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/Posts';
import Pagination from '../../components/Pagination/Pagination';
import './Home.css';

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
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch, currentId]);

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const handleAdd = (tag) => {
		setTags([...tags, tag]);
	};

	const handleDelete = (tag) => {
		setTags(tags.filter((t) => t !== tag));
	};

	const searchPost = () => {
		if (search.trim() || tags) {
			dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
			navigate(`/posts?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
		} else {
			navigate('/');
		}
	};

	return (
		<Grow in>
			<Container maxWidth='xl'>
				<Grid
					sx={(theme) => ({
						[theme.breakpoints.down('sm')]: {
							flexDirection: 'column-reverse',
						},
					})}
					container
					justifyContent='space-between'
					alignItems='stretch'
					spacing={3}
					className='grid-container'
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppBar
							className='app-bar-search'
							position='static'
							color='inherit'
						>
							<TextField
								name='search'
								variant='outlined'
								label='Search Memories'
								onKeyPress={handleKeyPress}
								fullWidth
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<ChipInput
								style={{ margin: '10px 0' }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label='Search Tags'
								variant='outlined'
								fullWidth
							/>
							<Button variant='contained' color='primary' onClick={searchPost}>
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						<Paper className='pagination' elevation={6}>
							<Pagination />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
