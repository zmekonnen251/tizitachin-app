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

export const fetchPost = (id) => axios.get(`/posts/${id}`);
export const fetchPosts = (page) => axios.get(`/posts/?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
	axios.get(
		`/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
			searchQuery.tags
		}`
	);
export const createPost = (newPost) => axios.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>
	axios.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`/posts/${id}`);
export const likePost = (id) => axios.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
	axios.post(`/posts/${id}/commentPost`, { value });
export const signIn = (formData) => axios.post(`/users/signin`, formData);
export const signUp = (formData) => axios.post(`/users/signup`, formData);
export const signOut = () => axios.get(`/users/signout`);
export const signInWithGoogle = (tokenId) =>
	axios.post(`/users/google`, { tokenId });

export const verifyEmail = (id, token) =>
	axios.get(`/users/${id}/confirmation/${token}`);

export const refreshToken = () => axios.get(`/users/refresh`);
