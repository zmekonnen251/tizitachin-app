import { AUTH, LOGOUT } from '../actionTypes';
const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

			return {
				...state,
				token: action.payload.token,
				userData: action.payload.user,
			};
		case LOGOUT:
			localStorage.clear();
			return {
				...state,
				token: null,
				userData: null,
			};
		default:
			return state;
	}
};

export default authReducer;
