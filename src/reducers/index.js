import { combineReducers } from 'redux';
import PictureReducer from './reducer_picture';

const rootReducer = combineReducers({
    pictures: PictureReducer
});

export default rootReducer;