import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Doctors from './doctorReducer';
import Activities from './activityReducer';
import Messages from './messageReducer';


export default combineReducers({
    doctors: Doctors,
    activities: Activities,
    message: Messages,
    form: formReducer
})