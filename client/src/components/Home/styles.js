import { createTheme } from '@mui/material';

const theme = createTheme();
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	appBarSearch: {
		borderRadius: 4,
		marginBottom: '1rem',
		display: 'flex',
		padding: '16px',
	},
	pagination: {
		borderRadius: 4,
		marginTop: '1rem',
		padding: '6px',
	},
	gridContainer: {
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column-reverse',
		},
	},
	searchInputTags: {
		marginTop: '1rem',
		marginBottom: '1rem',
	},

	searchInput: {},
};
