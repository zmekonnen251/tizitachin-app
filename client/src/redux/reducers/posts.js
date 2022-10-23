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
	COMMENT,
} from './../actionTypes';
const postReducer = (state = { isLoading: true, posts: [] }, action) => {
	switch (action.type) {
		case FETCH_POST:
			return {
				...state,
				post: action.payload,
			};
		case START_LOADING:
			return { ...state, isLoading: true };
		case END_LOADING:
			return { ...state, isLoading: false };
		case FETCH:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};
		case CREATE:
			if (state.posts.length === 8) {
				return {
					...state,
					posts: [action.payload, ...state.posts.slice(0, 7)],
				};
			} else {
				return { ...state, posts: [action.payload, ...state.posts] };
			}
		case UPDATE:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case DELETE:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};
		case LIKE:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case COMMENT:
			return {
				...state,
				posts: state.posts.map((post) => {
					if (+post._id === +action.payload._id) {
						return action.payload;
					}
					return post;
				}),
			};
		case FETCH_BY_SEARCH:
			return { ...state, posts: action.payload };
		default:
			return state;
	}
};

export default postReducer;
