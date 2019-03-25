import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onHandleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      })
      .then(res => {
        alert("you succesfully registered");
        this.props.history.replace("/login");
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <form action="" className="form">
          <div className="form__wrapper  top">
            <input
              onChange={this.onHandleChange}
              type="text"
              name="name"
              required
              autoComplete="off"
              className="form__wrapper__register"
              placeholder="username"
            />
            {errors.name && (
              <p className="form__wrapper__popup username">{errors.name}</p>
            )}
          </div>

          <div className="form__wrapper">
            <input
              onChange={this.onHandleChange}
              type="text"
              name="email"
              required
              autoComplete="off"
              className="form__wrapper__register "
              placeholder="email"
            />
            {errors.email && (
              <p className="form__wrapper__popup email">{errors.email}</p>
            )}
          </div>

          <div className="form__wrapper">
            <input
              onChange={this.onHandleChange}
              type="password"
              name="password"
              required
              autoComplete="off"
              className="form__wrapper__register "
              placeholder="password"
            />
            {errors.password && (
              <p className="form__wrapper__popup password">{errors.password}</p>
            )}
          </div>
          <div className="form__wrapper">
            <input
              onChange={this.onHandleChange}
              type="password"
              name="password2"
              required
              autoComplete="off"
              className="form__wrapper__register "
              placeholder="repeat password"
            />
            {errors.password2 && (
              <p className="form__wrapper__popup repeatpassword">
                {errors.password2}
              </p>
            )}
          </div>

          <Link to="/login" className="form__reg">
            Click here to log in
          </Link>

          <input
            onClick={this.onHandleSubmit}
            type="submit"
            value="Register"
            className="form__submit"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
