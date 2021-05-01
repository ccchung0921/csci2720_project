import {combineReducers} from 'redux';
import places from './place'
import historical from './historical';

export default combineReducers({
    places,
    historical,
})
