import axios from 'axios';
import  server  from './Config';

const GET= {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};


export const GetForms = () => {
    return axios.get(server.URI+'/api/forms');
}

export const AddForm = (data) => {
    return axios.post(server.URI+'/api/forms',data);
}

export const UpdateForm = (id,data) => {
    return axios.put(server.URI+'/api/forms/'+id,data);
}

export const GetOneForm = (id) => {
    return axios.get(server.URI+'/api/forms/'+id);
}