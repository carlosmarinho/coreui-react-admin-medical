import _ from 'lodash';
import axios from 'axios';
import { FETCH_DOCTOR, FETCH_DOCTORS, SUCCESS_CREATE_DOCTOR, ERROR_CREATE_DOCTOR, SUCCESS_EDIT_DOCTOR, ERROR_EDIT_DOCTOR, REMOVE_DOCTOR } from "./types";


export async function createDoctor(doctor) {
    console.log("vai criar o doutor");
    let request;
    try{
        request = await axios.post(`${process.env.REACT_APP_URL_API}doctors`, doctor);
        console.log("vai enviar o request para criar: ", request);
        if(request.statusText == 'Created'){
            return({
                type: SUCCESS_CREATE_DOCTOR,
                payload: request
            })
        }
        else{
            return({
                type: ERROR_CREATE_DOCTOR,
                payload: {msg: "Houve um erro ao efetuar o cadastro!" }
            })
        }
    }
    catch(e){
        console.log("Exception: ", e.response);

        return({
            type: ERROR_CREATE_DOCTOR,
            payload: {msg: e.response}
        })
    }
}


export async function editDoctor(id, values, callback) {
    console.log("vai criar o doutor");
    let request;
    try{
        request = await axios.put(`${process.env.REACT_APP_URL_API}doctors/${id}`, values);
        console.log("vai enviar o request para criar: ", request);
        if(request.statusText === 'OK'){
            return({
                type: SUCCESS_EDIT_DOCTOR,
                payload: request
            })
        }
        else{
            return({
                type: ERROR_EDIT_DOCTOR,
                payload: {msg: "Houve um erro ao efetuar o cadastro!" }
            })
        }
    }
    catch(e){
        console.log("Exception: ", e.response);

        return({
            type: ERROR_EDIT_DOCTOR,
            payload: {msg: e.response.data.message}
        })
    }
}

export const removeDoctor = (ids) => {

    let request = null;
    if( ids instanceof Array && ids.length > 1) {
        request = axios.delete(`${process.env.REACT_APP_URL_API}doctors`, {params: ids});
    }
    else{
        request = axios.delete(`${process.env.REACT_APP_URL_API}doctors/${ids}`);
    }


    return {
        type: REMOVE_DOCTOR,
        payload: {msg: "Médico excluído com sucesso!" }
    }
}



export const fetchDoctor = (id) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}doctors/${id}`);

    return {
        type: FETCH_DOCTOR,
        payload: request
    }
}

export const fetchDoctors = () => {
    const request = axios.get(`${process.env.REACT_APP_URL_API}doctors`);
    console.log("------ vai chamar o fetchDoctors -------")

    return {
        type: FETCH_DOCTORS,
        payload: request
    }
}
