import { FETCH_PICTURES, FETCH_NEW_PICTURES } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_PICTURES:
            // If it's the second request it concatenates the elements
            // with the previous state and return a new array
            return [ ...state, action.payload ];
        case FETCH_NEW_PICTURES:
            // If it's a new request return a new array
            return [ action.payload ];
        default:
            return state;
    }
}