import axios from 'axios'; //Use axios as a package

//Connect to API
const API = axios.create({baseURL:"http://mod2-api.herokuapp.com"});

export default API;