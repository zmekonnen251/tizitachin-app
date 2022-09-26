// import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const theme = createTheme();
const styles = {
	appBar: {
		borderRadius: 8,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 50px',
	},
	heading: {
		color: 'rgba(0,183,255, 1)',
		textDecoration: 'none',
	},
	image: {
		marginLeft: '15px',
	},
	toolbar: {
		display: 'flex',

		justifyContent: 'flex-end',
		width: '400px',
	},
	profile: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '400px',
	},
	userName: {
		display: 'flex',
		alignItems: 'center',
	},
	brandContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
};

export default styles;
