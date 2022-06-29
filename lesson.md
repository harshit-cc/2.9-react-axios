# 2.9: Axios, Asynchronous React and useEffect
## Preparation

You will code-along from scratch for Part 1 of this lesson. Create a work 
folder, e.g. `work`, and start your project from there. Install the `axios`
package before you begin.

```
npm install axios
```

Axios is a promise-based HTTP client for the browser and node.js. It allows 
the client to connect to APIs and retrieve/manipulate data as necessary. 
Promises are a way of making sure the API command completes before executing
the next line of code, i.e *asynchronous processing*.

There are two methods to implement asynchronous promises in Javascript:
- then...catch 
- async...await

## Part 1: Using Axios with `then()`

### Step 1: Create the Axios API Object

In your work folder, create a new file `axios-then.js`. 

```js
//axios-then.js
const axios = require('axios');
const BASE_URL = 'https://62ba9b04573ca8f8328762ca.mockapi.io';
const API = axios.create({ baseURL: BASE_URL });
```
We create an axios object with the base URL that points to an existing server
that will respond with mock API data. A valid URL will be provided during the 
session.

The API understands HTTP commands that are sent from your frontend application.

| CRUD Method | HTTP Command | Description |
|---|---|---|
| Create | POST | Add a new record | 
| Read | GET | Read all or individual records | 
| Update | PUT | Replace the entire record with new data |
| Delete | DELETE | Remove an existing record |

### Step 2: HTTP GET Command

The basic GET command simply requests the API to return a list of all existing
records stored in the backend server.

```js
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

apiGet(); 
```
After sending the GET request, the process waits for either a valid `response` 
is received from the server, or an `error` has occured. e.g. server not found. 
Try forcing an error by using an invalid BASE_URL. The `.then()...catch()` 
statements will be executed depending on the outcome of the GET request.

The `response` body contains a lot of information from the server, including
the useful `data` part. If the request was successful, the server shall respond
with a `status=200`. 

Similarly, the `error` body contains debugging information that might be useful,
e.g. `message`. 

Do a `console.log()` on the `response`/`error` body to see other data being returned
by the server.

You can also request the API to return a record by its ID number:

```js
/*
  GET request for single item referenced by ID
*/
function apiGetId(id) {
  API.get(`/product/${id}`)
...
}

apiGet(5); 
```
You must pass a valid ID to the function, otherwise the API will return an error.

### Step 3: HTTP POST Command

To create a new item and add to the database.

```js
function apiPost() {
  API.post(`/product`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
apiPost();
```
There is no need to supply any parameter to the POST command as the ID will be 
created automatically by the backend.

### Step 4: HTTP PUT Command

To edit an existing record in the database, you must provide:
- a valid ID of the record
- data object with updated values
  
```js
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
apiPut(5);
```
### Step 5: HTTP DELETE Command

To remove an existing record from the database, simply provide the ID:

```js
function apiDelete(id) {
  API.delete(`/product/${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
```

> As the server will take some time to respond to any data change requests,
> allow some time before sendinf a GET request to view the updated database.

## Part 2: Using Axios with `async...await`

An alternative method for implementing asynchronous promises in JS is using
the `await..async` statement pair.

Create a new JS file called `axios-await.js` with the same headers:

```js
//axios-await.js
const axios = require('axios');
const BASE_URL = 'https://62ba9b04573ca8f8328762ca.mockapi.io';
const API = axios.create({ baseURL: BASE_URL });
```

### Step 1: Using an IIFE

A pre-condition to using `async..await` is that the awaiting function must be
called from within an encapsulated `async` code block. You can implement an
an IIFE (Immediately Invoked Arrow Function) in the function declaration:

```js
// GET request
function apiGet() {
  (async () => {
    const response = await API.get('/product')
    console.log('GET status:', response.status);
    console.log('GET data:', response.data);
  }) ()
}
```
### Step 2: Using Arrow Functions

Alternatively, you can convert the apiGet function into an arrow function and
encapsulate `async` around it. Here is how to do it with the second form 
of the GET request (with ID):

```js
const apiGetId = async (id) => {
  const response = await API(`/product/${id}`);
    console.log(response.data);    
}
```
The code looks a lot cleaner with an arrow function, plus you easily add an
error handler:

```js
const apiGetId = async (id) => {
  try {
    const response = await API(`/product/${id}`);
      console.log(response.data);    
  } catch (error) {
    console.log(error.message);
  }
}
```
Test your code by invoking `getId()` and `getId(5)` after the function declarations.

### Step 3: Convert Axios HTTP Requests to `async...await`

Convert the remaining POST, PUT and DELETE methods to use `async...await` on your own.

> The complete final code can be found in the `code` folder. Do try it yourself first!

## Part 3: Integrating Axios into React

To prepare for this section, copy the starter project from folder `apps\begin` from the 
lesson repo into your working folder, e.g. `work`. We will integrate axios into a React
app and interact with the backend database using the API.

### Step 1: Create Axios API Component

Create a new file called `mockapi.js` to support the API in the `src/api` folder:

```js
//mockapi.js
import axios from 'axios';
const BASE_URL = 'https://62ba9b04573ca8f8328762ca.mockapi.io';
const mockAPI = axios.create({ baseURL: BASE_URL });

export default mockAPI
```
The `BASE_URL` value will be the same as the one used in previous sections. You can support multiple APIs by writing similar API components in the `api` folder.

### Step 2: Get Product List Using API

To use the API, simply import the API component into any React module and reference 
the API component. In this project, we will import the API into `App.js` and call a GET
request on the API to download a product list from the server:

```js
// App.js
import mockAPI from './api/mockapi`;

function App() {
  const apiGet = async () => {
    try {
      const response = await mockAPI.get(`/product/`);
      console.log(response.data);
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
At the moment, pressing the `Load` button simply logs the data on the console and
not much else. Let's put some data on the page by creating a new component, `Table`.

```js
// components/table.js
function Table({ list }) {
  return (
    <div>
      <p>{list[0].name}</p>
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

### Step 2: Update Product List with `useEffect`

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
include any props or state values in betwen the `[]`, the hook will trigger when that 
value changes. For example:

```js
useEffect(() => {
  apiGet();
}, [myProp])

```
In the above code, `apiGet` will be called when the value of `myProp` changes. 

The class componennt equivalent to `useEffect` hook are lifecycle methods:
- componentDidMount
- componentDidUpdate 
- componentWillUnmount

### Step 3: Add New Product

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

Add the new component and send the apiPOST handler from `App.js` via props:

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

> The final implementation can be found in the `apps/final` folder

## Coding Challenge

Implement full CRUD capability using techniques learnt from previous modules. 
Complete the app with functions to UPDATE and DELETE products using API commands,
with suitable UI components.



Create a file in the src folder called API.js and code along with the student.

Codebase for API.js:
```js
import axios from 'axios'; //Use axios as a package

//Connect to API
const API = axios.create({baseURL:"http://mod2-api.herokuapp.com"});

export default API;
```

Create a folder called screens and in the folder, create a filed called OwnerScreen.js. 

Note that OwnerScreen.js uses class components and is separated into a form to add new owners and a display for all owners.

Proceed to display all the users first.

Codebase for OwnerScreen.js
```js
import React from "react";
//Use the API connection created in API.js
import API from "../API";

class OwnerScreen extends React.Component {
  defaultState = {
    owner: { name: null },
    owners: [],
  };
  constructor() {
    super();
    this.listOwner = this.listOwner.bind(this);
    this.state = this.defaultState;
  }

  //Loads the list of owners when component mounts
  componentDidMount(){
    this.listOwner();
  }

  async listOwner() {
    //Calls the API's GET /owner route and retrieves the data.
    const { status, data } = await API.get("/owner");
    if (status === 200) {
      this.setState((state) => {
        state.owners = data;
        return state;
      });
    }
  }

  render() {
    return (
      <>
        <ul>
          {this.state.owners.map((o) => {
            return <li>{o.name}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default OwnerScreen;
```

After the list has displayed, add the form and the functions to add new owners.

Codebase for OwnerScreen
```js
import React from "react";
//Use the API connection created in API.js
import API from "../API";

class OwnerScreen extends React.Component {
  defaultState = {
    owner: { name: null },
    owners: [],
  };
  constructor() {
    super();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.addOwner = this.addOwner.bind(this);
    this.listOwner = this.listOwner.bind(this);
    this.state = this.defaultState;
  }

  //Loads the list of owners when component mounts
  componentDidMount(){
    this.listOwner();
  }

  handleOnChange(e) {
    this.setState((state) => {
      state.owner = { name: e.target.value };
      return state;
    });
  }

  async addOwner(e) {
    e.preventDefault();
    //Calls the API's POST /owner route and sends the owner data
    const { status } = await API.post("/owner", this.state.owner);
    if (status === 200) {
      this.listOwner();
    }
  }

  async listOwner() {
    //Calls the API's GET /owner route and retrieves the data.
    const { status, data } = await API.get("/owner");
    if (status === 200) {
      this.setState((state) => {
        state.owners = data;
        return state;
      });
    }
  }

  render() {
    return (
      <>
        
        <form onSubmit={this.addOwner}>
          <input
            type="text"
            placeholder="Enter a name"
            name="name"
            onChange={this.handleOnChange}
          />{" "}
          <button>Add</button>
        </form>

        
        <ul>
          {this.state.owners.map((o) => {
            return <li>{o.name}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default OwnerScreen;
```

---
