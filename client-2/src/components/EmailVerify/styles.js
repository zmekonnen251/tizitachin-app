import { createTheme } from '@mui/material';

const theme = createTheme();
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},

	paper: {
		padding: theme.spacing(2),
	},
	title: {
		margin: theme.spacing(2),
	},
	icon: {
		textAlign: 'center',
		fontSize: '100px',
	},
	content: {
		textAlign: 'center',
		padding: '3rem',
	},
	login: {
		color: 'blue',
		fontSize: '1.5rem',
		textDecoration: 'none',
	},
};
