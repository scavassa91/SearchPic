import { 
    FETCH_PICTURES ,
    FETCH_NEW_PICTURES,
    NOT_FOUND,
    REQUEST_ERROR
} from './types';
import axios from 'axios';

const API_KEY = '3e8ed4a38ad3cfc063639ef340dc3cfc';
const PHOTOS_METHOD = 'flickr.photos.search';
const TAG_METHOD = 'flickr.photos.getInfo';
const ROOT_URL = `https://api.flickr.com/services/rest/?api_key=${API_KEY}`;
const PER_PAGE = 20;

/**
 * Make the request and pass the returned objects to the Picture Reducer
 * @param {String} searchTerm Search text
 * @param {String} type Type of search 'text' or 'tags'
 * @param {int} page Page number
 * @param {boolean} newRequest Flag to tell when its the first request and then create a new array
 */
export function fetchPictures (searchTerm, type = 'text', page, newRequest = true) {

    // verify if the searchTerm is empty and change it to surfboards
    if (searchTerm === '')
        searchTerm = 'Surfboards';

    // Create the picture get url that will bring the pictures, title, and ids
    const photosUrl = `${ROOT_URL}&method=${PHOTOS_METHOD}&${type}=${searchTerm}&per_page=${PER_PAGE}&page=${page}&format=json&nojsoncallback=1`;
    
    return (dispatch) => {
        axios.get(photosUrl)
        .then(response => {

            if (response.data.stat === 'fail') {
                dispatch({
                    type: REQUEST_ERROR,
                    payload: { error: response.data.message }
                });
                return;
            }

            if (response.data.photos.photo.length === 0) {
                dispatch({
                    type: NOT_FOUND,
                    payload: 'not-found'
                });
            }
            
            //Make a request for each picture searching for the pictures tags
            response.data.photos.photo.forEach(photo => {

                const photo_id = photo.id;
                const photo_secret = photo.secret;

                // Create the tags url request that will bring the picture tags and user informations
                const tagUrl = `${ROOT_URL}&method=${TAG_METHOD}&photo_id=${photo_id}&secret=${photo_secret}&format=json&nojsoncallback=1`;
                
                axios.get(tagUrl)
                .then(response => {
                    
                    // Verify if its the first request to create a new array
                    // then dispatch the returned informations to the Reducer
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
                })
                .catch(error => {
                    // handle error
                    console.log(error);
                    
                    dispatch({
                        type: REQUEST_ERROR,
                        payload: { error: error.message }
                    });
                });
            });
            
        })
        .catch(error => {
            // handle error
            console.log(error);
            
            dispatch({
                type: REQUEST_ERROR,
                payload: { error: error.message }
            });
        });
    }
}
