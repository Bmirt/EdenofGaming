import React from "react";
import { withRouter } from "react-router-dom";
import AuthMethods from "./AuthMethods";
import Login from "../Login";
import Axios from "axios";
class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }
  componentDidMount() {
    console.log("in component did mount")
    const jwt = AuthMethods.getJWT();
    if (!jwt) {
      this.props.history.push("/login");
    }
    // console.log(jwt);
    Axios.get("http://localhost:5000/api/users/current", {
      headers: { Authorization: jwt }
    }).then(res => {
      console.log(res);
      this.setState({ user: res });
      console.log(this.state)
    });
  }
  render() {
    if (this.state.user === undefined) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          {this.props.children}
          {console.log(this.state.user)}
        </React.Fragment>
      );
    }
  }
}
export default withRouter(ProtectedRoute);
