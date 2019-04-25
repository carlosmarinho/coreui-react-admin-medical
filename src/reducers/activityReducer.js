import { FETCH_ACTIVITY, FETCH_ACTIVITIES } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_ACTIVITY:
            return action.payload.data;
        case FETCH_ACTIVITIES:
            return action.payload.data;
        default: return state;
    }
}