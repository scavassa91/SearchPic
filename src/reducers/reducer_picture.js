import { FETCH_PICTURES, FETCH_NEW_PICTURES } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_PICTURES:
            return [ action.payload, ...state ];
        case FETCH_NEW_PICTURES:
            return [ action.payload ];
        default:
            return state;
    }
}