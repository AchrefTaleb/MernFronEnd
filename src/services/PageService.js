import axios from 'axios';
import  server  from './Config';

const GET= {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};


export const GetPages = () => {
    return axios.get(server.URI+'/api/pages');
}

export const AddPage = (data) => {
    return axios.post(server.URI+'/api/pages',data);
}


export const UpdatePage = (id,data) => {
    return axios.put(server.URI+'/api/pages/'+id,data);
}

export const GetOnePage = (id) => {
    return axios.get(server.URI+'/api/pages/'+id);
}

