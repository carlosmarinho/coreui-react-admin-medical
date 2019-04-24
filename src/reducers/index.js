import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Users from './userReducer';
import Messages from './messageReducer';


export default combineReducers({
    users: Users,
    message: Messages,
    form: formReducer
})