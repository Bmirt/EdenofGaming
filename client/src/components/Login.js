import React from "react";
import axios from "axios";
import Auth from "./utils/AuthMethods";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      email: "",
      password: "",
      errors: {}
    };
  }
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onHandleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        Auth.storeToken(res.data.token);
        let user = Auth.getCurrentUser();
        this.state.updateUserState(user);
        this.props.history.replace("/");
 
      })
      .catch(err => {
        // console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <form action="" className="form login">
          <input
            onChange={this.onHandleChange}
            id="email"
            type="email"
            name="email"
            required
            autoComplete="off"
            className="form__register top"
            placeholder="Email"
          />
          
          {errors.email && (
            <div style={{ color: "red", fontSize: "15px" }}>{errors.email}</div>
          )}
          <input
            onChange={this.onHandleChange}
            id="password"
            type="password"
            name="password"
            required
            autoComplete="off"
            className="form__register"
            placeholder="Password"
          />
          {errors.password && (
            <div style={{ color: "red", fontSize: "15px" }}>
              {errors.password}
            </div>
          )}

          <button
            onClick={this.onHandleSubmit}
            type="submit"
            className="form__submit "
          >
            Log In
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
