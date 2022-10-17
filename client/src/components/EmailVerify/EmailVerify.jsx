import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import classes from './styles.js';
import { verifyEmail } from '../../redux/actions/auth.js';

const EmailVerify = () => {
	const dispatch = useDispatch();
	const [validUrl, setValidUrl] = useState({ valid: false, message: '' });
	const { id, token } = useParams();

	useEffect(() => {
		const verify = async () => {
			dispatch(verifyEmail(id, token, setValidUrl));
		};
		verify();
	}, [dispatch, id, token]);

	return (
		<Box sx={classes.root}>
			<Paper sx={classes.paper}>
				{validUrl.valid ? (
					<Box sx={classes.content}>
						<TaskAltIcon sx={classes.icon} color='success' />
						<Typography variant='h4' sx={classes.title}>
							{validUrl.message}
						</Typography>

						<Link to='/auth' style={classes.login}>
							Log In
						</Link>
					</Box>
				) : (
					<Box>
						<Typography variant='h4' sx={classes.title}>
							404 Not Found
						</Typography>
					</Box>
				)}
			</Paper>
		</Box>
	);
};

export default EmailVerify;
