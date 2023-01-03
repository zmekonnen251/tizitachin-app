import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/posts';
import authReducer from './reducers/auth';

const store = configureStore({
	reducer: {
		posts: postReducer,
		auth: authReducer,
	},
});

export default store;
