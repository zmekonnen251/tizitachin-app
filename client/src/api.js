import axios from 'axios';
// import decode from 'jwt-decode';

// const API = axios.create({
// 	// https://memories-social-project-app.herokuapp.com/
// 	baseURL: 'http://10.42.0.1:5000',
// });

axios.interceptors.request.use(async (req) => {
	if (localStorage.getItem('profile')) {
		const profile = JSON.parse(localStorage.getItem('profile'));
		req.headers.Authorization = `Bearer ${profile.token}`;
	}

	return req;
});

export const fetchPost = (id) => axios.get(`/api/posts/${id}`);
export const fetchPosts = (page) => axios.get(`/api/posts/?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
	axios.get(
		`/api/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
			searchQuery.tags
		}`
	);
export const createPost = (newPost) => axios.post('/api/posts', newPost);
export const updatePost = (id, updatedPost) =>
	axios.patch(`/api/posts/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`/api/posts/${id}`);
export const likePost = (id) => axios.patch(`/api/posts/${id}/likePost`);
export const comment = (value, id) =>
	axios.post(`/api/posts/${id}/commentPost`, { value });
export const signIn = (formData) => axios.post(`/api/users/signin`, formData);
export const signUp = (formData) => axios.post(`/api/users/signup`, formData);
export const signOut = () => axios.get(`/api/users/signout`);
export const signInWithGoogle = (tokenId) =>
	axios.post(`/api/users/google`, { tokenId });

export const verifyEmail = (id, token) =>
	axios.get(`/api/users/${id}/confirmation/${token}`);

export const refreshToken = () => axios.get(`/api/users/refresh`);
