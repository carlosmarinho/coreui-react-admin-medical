import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Doctors from './doctorReducer';
import Messages from './messageReducer';


export default combineReducers({
    doctors: Doctors,
    message: Messages,
    form: formReducer
})