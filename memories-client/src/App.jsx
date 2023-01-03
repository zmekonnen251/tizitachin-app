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
import EmailVerify from './components/EmailVerify/EmailVerify';
import { useSelector } from 'react-redux';

const App = () => {
	const user = useSelector((state) => state.auth.user);

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
					<Route
						path='/users/:id/confirmation/:token'
						element={<EmailVerify />}
					/>
				</Routes>
			</Router>
		</Container>
	);
};

export default App;
