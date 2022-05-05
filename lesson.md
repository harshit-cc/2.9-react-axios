## Brief

### How to use the lesson sample code

There are two folders prepared for the lesson. 
- [Instructor's folder](./lesson-sample-code/instructor-demo-code)
- [Learners' folder](./lesson-sample-code/learners-practice-code)

Instructor to use the code provided for demonstration during the I DO segment. Learners will use the java file provided in the respective folder for practice during the WE DO segment.

### Any other announcements to instructors or learners

A demo application has already been installed and cleaned up for the students. Instructors are encouraged to code along with the students while discussing the code.

---

## Part 1 - Installation of Axios and Creation of SampleAxios

Axios is a Promise-based HTTP client for the browser and node.js. It allows the client to connect to APIs and retrieve / manipulate data as necessary. 

Promises are a way of making sure the processing completes first before other code executes.

Install axios in the project by doing ```npm install axios```. After installation, create the file SampleAxios.js and code along with the student.

To run the file, go to the src directory and enter the command ```node SampleAxios.js```

---

## Part 2 - Integration of Axios with React JS

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
