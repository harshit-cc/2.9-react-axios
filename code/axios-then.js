/*
  HTTP methods: GET, POST, PUT, DELETE
  Base URL of the backend server will be provided/updated during class
*/
const BASE_URL = 'https://62ba9b04573ca8f8328762ca.mockapi.io';

const axios = require('axios');
const API = axios.create({ baseURL: BASE_URL });

/*
  GET request for all items in the database
*/
function apiGet() {
  API.get('/product')
    .then((response) => {
      console.log('GET status:', response.status);
      console.log('GET data:', response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

/*
  GET request for single item referenced by ID
*/
function apiGetId(id) {
  API.get(`/product/${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });

}
/*
  POST request to create a new record
*/
function apiPost() {
  API.post(`/product`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
/*
  PUT request to edit single item referenced by ID
*/
function apiPut(id) {
  API.put(`/product/${id}`, {
      name: '*** NEW PRODUCT ***',
      quantity: 8,
      price: '88.88',
    })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.message);
  });
}
/*
  DELETE request to delete  single item referenced by ID
*/
function apiDelete(id) {
  API.delete(`/product/${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}


/*------------------------------------------------------------------------
  Test your API commands by calling the functions above
-------------------------------------------------------------------------*/

apiGet();
// apiGetId(11);
// apiPost();
// apiPut(11);
// apiDelete(11);
