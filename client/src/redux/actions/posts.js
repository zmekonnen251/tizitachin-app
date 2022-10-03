import * as api from '../../api';
import {
	CREATE,
	DELETE,
	FETCH,
	LIKE,
	UPDATE,
	FETCH_BY_SEARCH,
	START_LOADING,
	END_LOADING,
	FETCH_POST,
} from './../actionTypes.js';
//Action Creators

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });

		const { data } = await api.fetchPost(id);

		dispatch({ type: FETCH_POST, payload: data });
		console.log(data);
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });

		const { data } = await api.fetchPosts(page);

		dispatch({ type: FETCH, payload: data });

		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	console.log('getPostsBySearch');
	console.log(searchQuery);
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (post, navigate) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });

		const { data } = await api.createPost(post);

		navigate(`/posts/${data._id}`);

		dispatch({ type: CREATE, payload: data });

		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);

		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	const user = JSON.parse(localStorage.getItem('profile'));
	try {
		const { data } = await api.likePost(id, user?.token);

		dispatch({ type: LIKE, payload: data });
	} catch (error) {
		console.log(error);
	}
};
