import _ from 'lodash';
import axios from 'axios';
import { FETCH_ACTIVITY, FETCH_ACTIVITIES } from "./types";


export const fetchDoctor = (id) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}activities/${id}`);

    return {
        type: FETCH_ACTIVITY,
        payload: request
    }
}

export const fetchActivities = () => {
    const request = axios.get(`${process.env.REACT_APP_URL_API}activities`);
    console.log("------ vai chamar o fetchActivities -------")

    return {
        type: FETCH_ACTIVITIES,
        payload: request
    }
}
