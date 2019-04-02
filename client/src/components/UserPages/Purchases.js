import React from "react";
import axios from "axios";
import Auth from "../utils/AuthMethods";

class Purchases extends React.Component {
  state = {
    purchases: [],
    isLoaded: false
  };
  componentDidMount() {
    const url = "/api/profile/purchases";
    const jwt = Auth.getJWT();
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ purchases: res }));
  }
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div>
          <h1 style={{ textAlign: "center", margin: "10px 0" }}>
            Your Bought Products
          </h1>
          <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}>
            {this.state.purchases.map(Element => (
              <div
                key={Element[0].item}
                style={{ textAlign: "center", margin: "10px 0", width:"200px" }}
              >
                <img src={Element[0].image} width="200xp" height="250px" />
                <h3>Name: {Element[0].name}</h3>
                <h3>Price: {Element[0].price}$</h3>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Purchases;
