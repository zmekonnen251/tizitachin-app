import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { signOut, refreshToken } from '../../redux/actions/auth';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, token } = useSelector((state) => state.auth);

	const location = useLocation();

	// eslint-disable-next-line react-hooks/exhaustive-deps

	useEffect(() => {
		console.log(token);
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				dispatch(refreshToken());
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<AppBar sx={classes.appBar} position='static' color='inherit'>
			<NavLink to='/' sx={classes.brandContainer}>
				<img src={memoriesText} alt='icon' height='45px' />
				<img
					sx={classes.image}
					src={memoriesLogo}
					alt='memories'
					height='40px'
				/>
			</NavLink>
			<Toolbar sx={classes.toolbar}>
				{user ? (
					<Box sx={classes.profile}>
						<Avatar sx={classes.purple} alt={user.name} src={user.imageUrl}>
							{user.name.charAt(0).toUpperCase()}
						</Avatar>
						<Typography sx={classes.userName} variant='h6'>
							{user.name}
						</Typography>
						<Button
							variant='contained'
							color='error'
							onClick={() => dispatch(signOut(navigate))}
						>
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
