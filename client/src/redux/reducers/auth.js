import { AUTH, LOGOUT, REFRESH_TOKEN } from '../actionTypes';
const authReducer = (state = {}, action) => {
	switch (action.type) {
		case AUTH:
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
			};
		case REFRESH_TOKEN:
			return {
				...state,
				token: action.payload.token,
			};
		case LOGOUT:
			return {
				...state,
				token: null,
				user: null,
			};
		default:
			return state;
	}
};

export default authReducer;
