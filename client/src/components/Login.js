import React from "react";
import axios from "axios";
import Auth from "./utils/AuthMethods";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
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
        this.props.setUserState(Auth.getCurrentUser());
        console.log(Auth.getCurrentUser())
      })
      .catch(err => {
        console.log(err.response.data);
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
            type="text"
            name="email"
            required
            autoComplete="off"
            className="form__register"
          />
          <label htmlFor="name" className="form__label">
            Username
          </label>
          {errors.email && (
            <div style={{ color: "red", fontSize: "15px" }}>{errors.email}</div>
          )}
          <input
            onChange={this.onHandleChange}
            type="password"
            name="password"
            required
            autoComplete="off"
            className="form__register"
          />
          <label htmlFor="password" className="form__label password">
            Password
          </label>
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
