import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	TextField,
	Button,
	Typography,
	Paper,
	Autocomplete,
	Chip,
} from '@mui/material';
import FileBase from 'react-file-base64';
import classes from './styles.js';
import { createPost, updatePost } from '../../redux/actions/posts.js';

const Form = ({ currentId, setCurrentId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth?.user);
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: [],
		selectedFile: '',
	});
	const post = useSelector((state) =>
		currentId ? state.posts.posts.find((p) => p._id === currentId) : null
	);

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const postDataInput = {
			...postData,
			tags: postData.tags.join(','),
		};
		if (currentId) {
			dispatch(updatePost(currentId, { ...postDataInput, name: user?.name }));
		} else {
			dispatch(createPost({ ...postDataInput, name: user?.name }, navigate));
		}
		handleClear();
	};
	const handleClear = () => {
		setCurrentId(null);
		setPostData({
			title: '',
			message: '',
			tags: '',
			selectedFile: '',
		});
	};

	if (!user?.name) {
		return (
			<Paper sx={classes.paper} elevation={6}>
				<Typography variant='h6' align='center'>
					Please Sign In to create your own memories and like other's memories.
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper sx={classes.paper} elevation={6}>
			<form
				sx={classes.form}
				autoComplete='off'
				noValidate
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					{currentId ? 'Editing' : 'Creating'} a Memory
				</Typography>

				<TextField
					sx={classes.fileInput}
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
					required
				/>

				<TextField
					multiline
					rows={4}
					sx={classes.fileInput}
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
					required
				/>

				<Autocomplete
					sx={classes.fileInput}
					multiple
					onChange={(e, value) =>
						setPostData({ ...postData, tags: [...postData.tags, value] })
					}
					// id='tags-filled'
					options={postData.tags.map((option) => option)}
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
							label='Tags'
							placeholder='Tags'
						/>
					)}
				/>
				{/* <TextField
					sx={classes.fileInput}
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(',') })
					}
					required
				/> */}

				<Box sx={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</Box>

				<Button
					sx={classes.buttonSubmit}
					variant='contained'
					color='primary'
					type='submit'
					fullWidth
				>
					Submit
				</Button>
				<Button
					size='small'
					variant='contained'
					color='success'
					onClick={handleClear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
