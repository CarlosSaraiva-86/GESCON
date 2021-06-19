import axios from 'axios';

export default {
 api: axios.create({
    baseURL: 'http://localhost:8888/api',
    headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
}),
loginApi: axios.create({
    baseURL: 'http://localhost:3030',
    headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    withCredentials: true
})
}