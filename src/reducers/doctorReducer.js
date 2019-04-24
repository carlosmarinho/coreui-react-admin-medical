import { FETCH_DOCTOR, LOGIN, FETCH_DOCTORS, CREATE, CREATE_DOCTOR, EDIT_DOCTOR, REMOVE_DOCTOR } from "../actions/types";

export default function(state = null, action) {
    console.log("action: ", action)
    switch (action.type) {
        case CREATE_DOCTOR:
            return action.payload;
        case EDIT_DOCTOR:
            return action.payload;
        case REMOVE_DOCTOR:
            return action.payload;
        case FETCH_DOCTOR:
            return action.payload.data;
        case FETCH_DOCTORS:
            return action.payload.data;
        case CREATE:
            return action.payload;
        case LOGIN:
            return action.payload;
        default: return state;
    }
}