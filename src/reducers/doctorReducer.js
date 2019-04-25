import { FETCH_DOCTOR, FETCH_DOCTORS, CREATE, SUCCESS_CREATE_DOCTOR, SUCCESS_EDIT_DOCTOR, ERROR_CREATE_DOCTOR, ERROR_EDIT_DOCTOR, REMOVE_DOCTOR } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case SUCCESS_CREATE_DOCTOR:
        return action.payload;
        case SUCCESS_EDIT_DOCTOR:
        return action.payload;
        case ERROR_CREATE_DOCTOR:
        return action.payload;
        case ERROR_EDIT_DOCTOR:
        return action.payload
        case FETCH_DOCTOR:
        console.log("action: ", action.payload.data)
            return action.payload.data;
        case FETCH_DOCTORS:
            return action.payload.data;
        case CREATE:
            return action.payload;
        default: return state;
    }
}