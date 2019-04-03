import React from "react";
import Auth from "../utils/AuthMethods";
import { Spinner } from "../Spinner";

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
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ purchases: res, isLoaded: true }))
      .catch(err => console.log(err));
  }
  render() {
    if (!this.state.isLoaded) {
      return <Spinner />;
    }
    return (
      <React.Fragment>
        <div style={{color:"#FFF"}}>
          <h2 style={{ textAlign: "center", margin: "10px 0" }}>
            Your Bought Products
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            {this.state.purchases.map(Element => (
              <div
                key={Element[0].item}
                style={{
                  textAlign: "center",
                  margin: "10px 0",
                  width: "200px"
                }}
              >
                <img src={Element[0].image} width="200xp" height="250px" />
                <h4>Name: {Element[0].name}</h4>
                <h4>Price: {Element[0].price}$</h4>

                <h4>Kye: {Element[0].cdkey}</h4>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
//
export default Purchases;
