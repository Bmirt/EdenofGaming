import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
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
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(function(error) {
        console.log(JSON.stringify(error));
      });
  };

  render() {
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
