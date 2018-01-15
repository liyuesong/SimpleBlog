import { combineReducers } from 'redux';
// rename as formReducer
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
	posts: PostsReducer, 
	form: formReducer
});

export default rootReducer;
