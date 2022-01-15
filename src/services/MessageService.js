import axios from 'axios';
import  server  from './Config';

const GET= {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};


export const GetMessages = () => {
    return axios.get(server.URI+'/api/messages');
}

export const AddMessage = (data) => {
    return axios.post(server.URI+'/api/messages',data);
}

export const GetOneMessage = (id) => {
    return axios.get(server.URI+'/api/messages/'+id);
}