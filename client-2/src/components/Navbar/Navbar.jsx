import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
	AppBar,
	Avatar,
	Toolbar,
	Typography,
	Button,
	Box,
} from '@mui/material';
import classes from './styles';
import memoriesLogo from '../../assets/memories-Logo.png';
import memoriesText from '../../assets/memories-Text.png';
import { signOut, getUser } from '../../redux/actions/auth';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (!user) dispatch(getUser());
	}, [location, dispatch, user]);

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
