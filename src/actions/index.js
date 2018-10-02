import { FETCH_PICTURES } from './types';
import axios from 'axios';

const API_KEY = '3e8ed4a38ad3cfc063639ef340dc3cfc';
const ROOT_URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}`;

export function fetchPictures (searchTerm, page) {
    const url = `${ROOT_URL}&text=${searchTerm}&per_page=20&page=${page}&format=json&nojsoncallback=1`;
    const request = axios.get(url);

    return {
        type: FETCH_PICTURES,
        payload: request
    };
}
