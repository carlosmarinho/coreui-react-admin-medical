import { ERROR_CREATE_DOCTOR, SUCCESS_CREATE_DOCTOR, REMOVE_DOCTOR  } from "../actions/types";

export default function(state = null, action) {

    let message = {success: {
            doctor: null, 
        },
        error: {
            doctor:null,
        }
    }
    switch (action.type) {
        case ERROR_CREATE_DOCTOR:
            message.success.doctor = null
            
            message.error.doctor = action.payload;
            return message;
        case SUCCESS_CREATE_DOCTOR:
            message.error.doctor = null;
            
            message.success.doctor = action.payload;
            return message;

        case REMOVE_DOCTOR:
            message.success.doctor = action.payload;
            return message
       
        default: return state;
    }
}