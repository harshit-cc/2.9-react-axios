/*
  HTTP methods: GET, POST, PUT, DELETE
  Base URL of the backend server will be provided/updated during class
*/
const BASE_URL = 'https://62ba9b04573ca8f8328762ca.mockapi.io';

const axios = require('axios');
const API = axios.create({ baseURL: BASE_URL });

/*
  GET request for all items in the database
  - Using an IIFE (Immediately Invoked Arrow Function) -- kinda messy!
*/
function apiGet() {
  (async () => {
    const response = await API.get('/product')
    console.log('GET status:', response.status);
    console.log('GET data:', response.data);
  }) ()
}

/*
  GET request for single item referenced by ID
  - Using arrow function -- preferred!
  - With try...catch error handling
*/
const apiGetId = async (id) => {
  try {
    const response = await API(`/product/${id}`);
      console.log(response.data);    
  } catch (error) {
    console.log(error.message);
  }
}

/*
  POST request to create a new record
*/
const apiPost = async () => {
  try {
    const response = await API.post(`/product`)
      console.log(response.data);
    } catch(error) {
      console.log(error.message);
    };
}
/*
  PUT request to edit single item referenced by ID
*/
const apiPut = async (id) => {
  try {
    const response = await API.put(`/product/${id}`, {
      name: '*** NEW PRODUCT ***',
      quantity: 8,
      price: '88.88',
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}
/*
  DELETE request to delete  single item referenced by ID
*/
const apiDelete = async (id) => {
  try {
    const response = await API.delete(`/product/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);    
  }
}


/*------------------------------------------------------------------------
  Test your API commands by calling the functions above
-------------------------------------------------------------------------*/

apiGet();
// apiGetId(3);
// apiPost();
// apiPut(4);
// apiDelete(4);
