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
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => this.setState({ errors: err.response.data }));
      if(!Object.keys(this.state.errors).length===0){
        alert("you succesfully registered")
        this.props.history.replace("/login")
      }
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
            className="form__register"
          />
          <label htmlFor="name" className="form__label">
            Username
          </label>
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}

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
            <div style={{ color: "red" }}>{errors.password}</div>
          )}

          <input
            onChange={this.onHandleChange}
            type="password"
            name="password2"
            required
            autoComplete="off"
            className="form__register"
          />
          <label htmlFor="password" className="form__label repeatpassword">
            Repeat Password
          </label>
          {errors.password2 && (
            <div style={{ color: "red" }}>{errors.password2}</div>
          )}

          <input
            onChange={this.onHandleChange}
            type="text"
            name="email"
            required
            autoComplete="off"
            className="form__register"
          />
          <label htmlFor="email" className="form__label email">
            Email{" "}
          </label>
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}

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
            value="SUBMIT"
            className="form__submit"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
