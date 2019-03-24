import React from "react";
import axios from "axios";

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
        <form className="form">
          <input
            onChange={this.onHandleChange}
            type="text"
            name="name"
            required
            autoComplete="off"
            className="form__register top"
            placeholder="username"
          />

          {errors.name && <div className="error" style={{ color: "red" }}>{errors.name}</div>}

          <input
            onChange={this.onHandleChange}
            type="text"
            name="email"
            required
            autoComplete="off"
            className="form__register"
            placeholder="Email"
          />
          {errors.email && <div className="error" style={{ color: "red" }}>{errors.email}</div>}

          <input
            onChange={this.onHandleChange}
            type="password"
            name="password"
            required
            autoComplete="off"
            className="form__register"
            placeholder="Password"
          />

          {errors.password && (
            <div className="error" style={{ color: "red" }}>{errors.password}</div>
          )}

          <input
            onChange={this.onHandleChange}
            type="password"
            name="password2"
            required
            autoComplete="off"
            className="form__register"
            placeholder="Repeat Password"
          />

          {errors.password2 && (
            <div className="error" style={{ color: "red" }}>{errors.password2}</div>
          )}

          {/* <input
            type="text"
            name="age"
            required
            autoComplete="off"
            className="form__register"
          />
          <label htmlFor="age" className="form__label age">
            Age
          </label>

          <input
            type="text"
            name="bday"
            required
            autoComplete="off"
            className="form__register"
          />
          <label for="bday" className="form__label bday">
            Birthday
          </label>

          <input
            type="text"
            name="balance"
            required
            autoComplete="off"
            className="form__register"
          />
          <label htmlFor="balance" className="form__label balance">
            Balance
          </label> */}

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
