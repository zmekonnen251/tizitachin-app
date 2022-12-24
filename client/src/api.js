import axios from 'axios';
// import decode from 'jwt-decode';

export const API = axios.create(
	// {
	// 	// https://memories-social-project-app.herokuapp.com/
	// 	baseURL: 'http://localhost:4000',
	// },
	{
		withCredentials: true,
	}
);

API.interceptors.request.use(async (req) => {
	if (localStorage.getItem('profile')) {
		const profile = JSON.parse(localStorage.getItem('profile'));
		req.headers.Authorization = `Bearer ${profile.token}`;
	}

	return req;
});

export const fetchPost = (id) => API.get(`/api/posts/${id}`);
export const fetchPosts = (page) => API.get(`/api/posts/?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
	API.get(
		`/api/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
			searchQuery.tags
		}`
	);
export const createPost = (newPost) => API.post('/api/posts', newPost);
export const updatePost = (id, updatedPost) =>
	API.patch(`/api/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/api/posts/${id}`);
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`);
export const comment = (value, id) =>
	API.post(`/api/posts/${id}/commentPost`, { value });
export const signIn = (formData) => API.post(`/api/users/signin`, formData);
export const signUp = (formData) => API.post(`/api/users/signup`, formData);
export const signOut = () => API.get(`/api/users/signout`);
export const signInWithGoogle = (tokenId) =>
	API.post(`/api/users/google`, { tokenId });

export const verifyEmail = (id, token) =>
	API.get(`/api/users/${id}/confirmation/${token}`);

export const refreshToken = () => API.get(`/api/users/refresh`);
