import { 
    FETCH_PICTURES ,
    FETCH_NEW_PICTURES
} from './types';
import axios from 'axios';

const API_KEY = '3e8ed4a38ad3cfc063639ef340dc3cfc';
const PHOTOS_METHOD = 'flickr.photos.search';
const TAG_METHOD = 'flickr.photos.getInfo';
const ROOT_URL = `https://api.flickr.com/services/rest/?api_key=${API_KEY}`;
const PER_PAGE = 20;

export function fetchPictures (searchTerm, type = 'text', page, newRequest = true) {

    if (searchTerm === '')
        searchTerm = 'Surfboards';

    const photosUrl = `${ROOT_URL}&method=${PHOTOS_METHOD}&${type}=${searchTerm}&per_page=${PER_PAGE}&page=${page}&format=json&nojsoncallback=1`;
    
    return (dispatch) => {
        axios.get(photosUrl)
        .then(response => {

            response.data.photos.photo.map(photo => {

                const photo_id = photo.id;
                const photo_secret = photo.secret;
                const tagUrl = `${ROOT_URL}&method=${TAG_METHOD}&photo_id=${photo_id}&secret=${photo_secret}&format=json&nojsoncallback=1`;
                
                axios.get(tagUrl)
                .then(response => {
                    
                    if (!newRequest) {
                        dispatch({
                            type: FETCH_PICTURES,
                            payload: { photo: photo, tags: response.data.photo }
                        });
                    } else {
                        newRequest = false;
                        dispatch({
                            type: FETCH_NEW_PICTURES,
                            payload: { photo: photo, tags: response.data.photo }
                        });
                    }
                });

                return photo;
            });
            
        });
    }
}
