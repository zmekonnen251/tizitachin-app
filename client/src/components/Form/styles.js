import { createTheme } from '@mui/material';

const theme = createTheme();
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	paper: {
		padding: theme.spacing(2),
	},
	form: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},
	fileInput: {
		width: '97%',
		margin: '10px 0',
	},
	buttonSubmit: {
		marginBottom: 3,
	},
};
