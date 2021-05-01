import {combineReducers} from 'redux';
import places from './place'
import historical from './historical';
import auth from './auth';

export default combineReducers({
    places,
    historical,
    auth
})
