import { AUTH, LOGOUT } from '../actionTypes';

const authReducer = (state = {}, action) => {
	switch (action.type) {
		case AUTH:
			return {
				...state,

				user: action.payload.user,
			};

		case LOGOUT:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

export default authReducer;
