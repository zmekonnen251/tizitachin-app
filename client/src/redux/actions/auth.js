import { AUTH, LOGOUT } from '../actionTypes';
import * as api from '../../api';

export const signIn = (formData, navigate) => async (dispatch) => {
	try {
		//log in the user..
		const { data } = await api.signIn(formData);
		const { accessToken: token, user } = data;

		dispatch({ type: AUTH, payload: { token, user } });

		navigate('/');
	} catch (error) {
		console.log(error);
	}
};

export const signUp = (formData, setMsg) => async (dispatch) => {
	try {
		//sign up the user..
		const {
			data: { message },
		} = await api.signUp(formData);

		setMsg(message);
	} catch (error) {
		console.log(error);
	}
};

export const signInWithGoogle = (tokenId, navigate) => async (dispatch) => {
	try {
		//sign up the user..
		const { data } = await api.signInWithGoogle(tokenId);
		const { accessToken: token, user } = data;

		dispatch({ type: AUTH, payload: { token, user } });
		navigate('/');
	} catch (error) {
		console.log(error);
	}
};

export const signOut = (navigate, setUser) => async (dispatch) => {
	try {
		const res = await api.signOut();
		if (res.status === 200) {
			dispatch({ type: LOGOUT });
			setUser(null);
			navigate('/auth');
		}
	} catch (error) {
		console.log(error);
	}
};

export const verifyEmail = (id, token, setValidUrl) => async (dispatch) => {
	try {
		const res = await api.verifyEmail(id, token);

		if (res.status === 200) {
			setValidUrl({ valid: true, message: res.data.message });
		}
	} catch (error) {
		if (
			error.response.status === 400 &&
			error.response.data.message === 'Email already verified'
		) {
			setValidUrl({ valid: true, message: error.response.data.message });
		}
		console.log(error);
	}
};

export const refreshToken = (setUser) => async (dispatch) => {
	try {
		const { data } = await api.refreshToken();
		const { accessToken: token, user } = data;

		dispatch({ type: AUTH, payload: { token, user } });
		setUser(user);
	} catch (error) {
		console.log(error);
	}
};
