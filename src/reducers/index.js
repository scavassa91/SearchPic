import { combineReducers } from 'redux';
import PictureReducer from './reducer_picture';
import TagsReducer from './reducer_tags';

const rootReducer = combineReducers({
    pictures: PictureReducer,
    tags: TagsReducer
});

export default rootReducer;