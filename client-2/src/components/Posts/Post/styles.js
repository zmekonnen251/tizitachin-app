import { createTheme } from '@mui/material';

const theme = createTheme();

const classes = {
	media: {
		height: 0,
		paddingTop: '56.25%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		backgroundBlendMode: 'darken',
	},
	border: {
		border: 'solid',
	},
	fullHeightCard: {
		height: '100%',
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		borderRadius: '15px',
		height: '350px',
		position: 'relative',
		width: '100%',
		[theme.breakpoints.down('md')]: {
			height: 'auto',
		},
	},
	overlay: {
		position: 'absolute',
		top: '20px',
		left: '20px',
		color: 'white',
	},
	overlay2: {
		position: 'absolute',
		top: '20px',
		right: '20px',
		color: 'white',
	},
	grid: {
		display: 'flex',
	},
	details: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '10px',
	},
	title: {
		padding: '0 10px',
	},
	cardActions: {
		padding: '0 12px 18px 12px',
		display: 'flex',
		justifyContent: 'space-between',
	},
	cardAction: {
		display: 'block',
		textAlign: 'initial',
	},
};

export default classes;
