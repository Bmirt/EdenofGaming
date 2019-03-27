import React from "react";
import { withRouter } from "react-router-dom";
import AuthMethods from "./AuthMethods";
import Axios from "axios";
class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }
  componentDidMount() {
    const jwt = AuthMethods.getJWT();
    if (!jwt) {
      this.props.history.push("/login");
    }
    Axios.get("http://localhost:5000/api/users/current", {
      headers: { Authorization: jwt }
    }).then(res => {
      this.setState({ user: res });
    })
    .catch(err => AuthMethods.logout())
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
        </React.Fragment>
      );
    }
  }
}
export default withRouter(ProtectedRoute);
