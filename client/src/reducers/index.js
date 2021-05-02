import {combineReducers} from 'redux';
import places from './place'
import historical from './historical';
import auth from './auth';
import favourite from './favourite';
import comment from './comment';

export default combineReducers({
    places,
    historical,
    auth,
    favourite,
    comment,
})
