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