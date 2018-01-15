import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_POSTS:
			// transform [post1, post2, ...] to {id: post}
			return _.mapKeys(action.payload.data, 'id');
		default:
			return state;
	}
}