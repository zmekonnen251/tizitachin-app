import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import {
	AppBar,
	Avatar,
	Toolbar,
	Typography,
	Button,
	Box,
} from '@mui/material';
import classes from './styles';
import memories from '../../images/memories.png';
import { LOGOUT } from '../../redux/actionTypes';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const location = useLocation();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const logout = () => {
		setUser(null);
		navigate('/auth');
		dispatch({ type: LOGOUT });
	};

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				logout();
			}
		}

		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location, logout, user?.token]);

	return (
		<AppBar sx={classes.appBar} position='static' color='inherit'>
			<Box sx={classes.brandContainer}>
				<Typography
					sx={classes.heading}
					component={NavLink}
					to='/'
					variant='h2'
					align='center'
				>
					Memories
				</Typography>
				<img sx={classes.image} src={memories} alt='memories' height='60' />
			</Box>
			<Toolbar sx={classes.toolbar}>
				{user ? (
					<Box sx={classes.profile}>
						<Avatar
							sx={classes.purple}
							alt={user.result.name}
							src={user.result.imageUrl}
						>
							{user.result.name.charAt(0).toUpperCase()}
						</Avatar>
						<Typography sx={classes.userName} variant='h6'>
							{user.result.name}
						</Typography>
						<Button variant='contained' color='error' onClick={logout}>
							Logout
						</Button>
					</Box>
				) : (
					<Button
						component={NavLink}
						to='/auth'
						variant='contained'
						color='primary'
					>
						Sign in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
