import { FETCH_TAGS, FETCH_NEW_TAGS } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_TAGS:
            return [ action.payload.data.photo, ...state ];
        case FETCH_NEW_TAGS:
            return [ action.payload.data.photo ];
        default:
            return state;
    }
}