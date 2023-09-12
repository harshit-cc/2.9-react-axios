# 2.9 Axios, Asynchronous React and useEffect
## Preparation

You will code-along from scratch for Part 1 of this lesson. Create a work 
folder, e.g. `work`, and start your project from there. Install the `axios`
package before you begin.

```
npm install axios
```
To prepare for this section, copy the starter project from folder `code\begin` from the 
lesson repo into your working folder, e.g. `work`. We will integrate axios into a React
app and interact with the backend database using the API.

## Part 1: Integrating Axios into React

Axios is a promise-based HTTP client for the browser and node.js. It allows 
the client to connect to APIs and retrieve/manipulate data as necessary. 
Promises are a way of making sure the API command completes before executing
the next line of code, i.e *asynchronous processing*.


### Step 1: Create Axios API Component

Create a new file called `mockapi.js` to support the API in the `src/api` folder:

```js
//mockapi.js
import axios from 'axios';
const BASE_URL = 'https://62ba9b04573ca8f8328762ca.mockapi.io';
const mockAPI = axios.create({ baseURL: BASE_URL });

export default mockAPI
```
> INSTRUCTOR NOTE: mockapi has a hard limit of 100 requests per resource endpoint. Create
>    your own api BASE_URL or using an alternative api server, e.g. json-server if the 
>    sample endpoint endpoint stops working 

The `BASE_URL` value will be the same as the one used in previous sections. You can support multiple APIs by writing similar API components in the `api` folder.

To use the API, simply import the API component into any React module and reference 
the API component. 

There are two methods to implement asynchronous promises in Javascript:
- `then...catch` 
- `async...await`

Here is an example of using `then...catch` for promises in JS:

```js
// App.js
import mockAPI from './api/mockapi';

function App() {
  function apiGet() {
    mockAPI.get('/product')
      .then((response) => {
        console.log('GET status:', response.status);
        console.log('GET data:', response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <div className="App">
      <h1>Product List</h1>
      <button onClick={apiGet}>Load Products</button>
    </div>
  );
}
```

For this project, we will use `async...await`.

## Part 2: Implement CRUD  with `async...await`

The API understands HTTP commands that are sent from your frontend application.

| CRUD Method | HTTP Command | Description |
|---|---|---|
| Create | POST | Add a new record | 
| Read | GET | Read all or individual records | 
| Update | PUT | Replace the entire record with new data |
| Delete | DELETE | Remove an existing record |


### GET Command

The basic GET command simply requests the API to return a list of all existing
records stored in the backend server.

```js
// App.js
import mockAPI from './api/mockapi`;

function App() {
  const apiGet = async () => {
    try {
      const response = await mockAPI.get(`/product/`);
      console.log(response.data);
      setProducts(response.data);    
    } catch (error) {
      console.log(error.message);
    }
  }  
  return (
    <div className="App">
      <h1>Product List</h1>
      <button onClick={apiGet}>Load Products</button>
    </div>
  );
}
```

You can also request the API to return a record by its ID number by passing a valid ID 
to the function. If the ID number does not exist in the server, the API will return an error.

You can replace the apiGet method with the apiGetId to see the single item.

```js
const apiGetId = async (id) => {
  try {
    const response = await mockAPI(`/product/${id}`);
      console.log(response.data);    
  } catch (error) {
    console.log(error.message);
  }
}
```
Test your code by invoking `getId()` and `getId(5)` after the function declarations.

After sending the GET request, the process waits for either a valid `response` 
is received from the server, or an `error` has occured. e.g. server not found. 
Try forcing an error by using an invalid BASE_URL. 

The `response` body contains a lot of information from the server, including
the useful `data` part. If the request was successful, the server shall respond
with a `status=200`. 

Similarly, the `error` body contains debugging information that might be useful,
e.g. `message`. 

Do a `console.log()` on the `response`/`error` body to see other data being returned
by the server.


### POST Command

To create a new item and add to the database.

```js
  const apiPost = async (newProduct) => {
    try {
      const response = await mockAPI.post(`/product`, newProduct)
      console.log(response.data);
      apiGet();
    } catch(error) {
      console.log(error.message);
    };
  }
```
There is no need to supply any parameter to the POST command for now as the ID will be 
created automatically by the backend.

### PUT Command

To edit an existing record in the database, you must provide:
- a valid ID of the record
- data object with updated values
  
```js
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
```

Try calling the method with any existing ID and see the effect.

### DELETE Command

To remove an existing record from the database, simply provide the ID:

```js
const apiDelete = async (id) => {
  try {
    const response = await API.delete(`/product/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);    
  }
}

```
Try calling the method with any existing ID and see the effect.

> As the server will take some time to respond to any data change requests,
> allow some time before sending a GET request to view the updated database.

## Part 3: Putting Data on the Page with `useEffect` Hook

At the moment, pressing the `Load` button simply logs the data on the console and
not much else. Let's put some data on the page by creating a new component, `Table`.

```js
// components/table.js
function Table({ list }) {
  return (
    <div>
      <p>{list && list[0].name}</p>
    </div>
  );
}
export default Table;
```
In order to make use of the downloaded data in your React application, the data
must be stored in a state array, e.g. `products` with the `useState` hook. Send 
product list as a prop to the `Table` component:

```js
// App.js
import { useState } from 'react';
import Table from './components/Table';
...
  const [products, setProducts] = useState([]);
  const apiGet = async () => {
  ...
    const response = await mockAPI.get(`/product/`);
    setProducts(response.data);    
    ...
  }
  return (
    <button onClick={apiGet}>Load Products</button>
    <Table list={products} /> 
    ...
  )
```
When you click on the `Load` button, you should be able to see the first item
on the downloaded product list on the application. Let's unpack the `list` prop
and populate the data into a proper table with the pre-defined CSS styling.

```js
import styles from './Table.module.css';
function Table({ list }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
```
Pressing the `Load` button should refresh the table with the latest data
currently available on the backend server.

### Update Product List with `useEffect`

We can trigger any React component to load new API data whenever the application
starts with the `useEffect` hook. 

```js
// App.js
import { useState, useEffect } from 'react';
...
  useEffect(() => {
    apiGet();
  }, [])

  return (...)

```
Don't forget to add the square brackets `[]` as the second argument of the `useEffect`
function to ensure that the `apiGet` function is called only on the first render. If you
include any props or state values in between the `[]`, the hook will trigger when that 
value changes. For example:

```js
useEffect(() => {
  apiGet();
}, [myProp])

```
In the above code, `apiGet` will be called when the value of `myProp` changes. 

The class component equivalent to `useEffect` hook are lifecycle methods:
- componentDidMount
- componentDidUpdate 
- componentWillUnmount

### Add New Product

Implement the ADD method to enter a new record into the database via the API.
Create a new component, `AddForm.js`:

```js
//components/AddForm.js
import { useState } from 'react';

function AddForm({ handlerAddItem }) {
  const [item, setItem] = useState();
  
  const handlerName = (e) => {
    const form = {...item, name: e.target.value};
    setItem(form);
  }
  const handlerQuantity = (e) => {
    const form = {...item, quantity: e.target.value};
    setItem(form);
  }
  const handlerPrice = (e) => {
    const form = {...item, price: e.target.value};
    setItem(form);
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
    handlerAddItem(item);
  }
  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <input type='text' name='name' placeholder='Product name' onChange={handlerName} />
        <input type='text' name='quantity' placeholder='Quantity' onChange={handlerQuantity} />
        <input type='text' name='price' placeholder='Price' onChange={handlerPrice} />
        <button>Add</button>
      </form>
    </div>
  )
}
export default AddForm

```

Add the new component, modify the apiPOST handler to add the new product and send it from `App.js` via props:

```js
import AddForm from './components/AddForm';
...
  const apiPost = async (newProduct) => {
    try {
      const response = await mockAPI.post(`/product`, newProduct)
      console.log(response.data);
      apiGet();
    } catch(error) {
      console.log(error.message);
    };
  }
  return (
    <div className='App'>
      ...
      <AddForm handlerAddItem={apiPost} />
    </div>
  )
```
The API POST command accepts a second parameter that specifies the values
of the new record to be added into the database. When the parameter it is 
left out, the backend will generate random values for the new record.

> The final implementation can be found in the `code/final` folder

## Coding Challenge

Implement full CRUD capability using techniques learnt from previous modules. 
Complete the app with functions to UPDATE and DELETE products using API commands,
with suitable UI components.

