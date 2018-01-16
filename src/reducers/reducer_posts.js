import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case DELETE_POST:
			// if the state has a key is action.payload, drop it and return new one does not contain this id
			return _.omit(state, action.payload);
		case FETCH_POST:
			// const post = action.payload.data;
			// const newState = { ...state };
			// newState[post.id] = post;
			// return newState;
			// ES6:
			return { ...state, [action.payload.data.id]: action.payload.data };

		case FETCH_POSTS:
			// transform [post1, post2, ...] to {id: post}
			return _.mapKeys(action.payload.data, 'id');
		default:
			return state;
	}
}