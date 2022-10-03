import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const user = JSON.parse(localStorage.getItem('profile'));

const App = () => {
	return (
		<Container maxWidth='xl'>
			<Router>
				<Navbar />
				<Routes>
					<Route
						path='/'
						exact
						element={<Navigate to='/posts' replace={true} />}
					/>
					<Route path='/posts' exact element={<Home />} />
					<Route path='/posts/search' exact element={<Home />} />
					<Route path='/posts/:id' exact element={<PostDetails />} />
					<Route
						exact
						path='/auth'
						element={!user ? <Auth /> : <Navigate to='/posts' replace={true} />}
					/>
				</Routes>
			</Router>
		</Container>
	);
};

export default App;
