import React from "react";
import axios from "axios";
import Auth from "../utils/AuthMethods";
import { Link } from "react-router-dom";
import UserContext from '../../context/user-context';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  static contextType = UserContext;
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
        this.context.user = user;
        console.log(this.context.user)
        this.props.history.replace("/");
        window.scroll(0, 0);
      })
      .catch(err => {
        console.log(err.response)
        this.setState({ errors: err.response.data });
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <form action="" className="form login">
          <div className="form__wrapper top">
            <input
              onChange={this.onHandleChange}
              type="email"
              name="email"
              required
              autoComplete="off"
              className="form__wrapper__register top "
              placeholder="Email"
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

          <button
            onClick={this.onHandleSubmit}
            type="submit"
            className="form__submit "
          >
            Log In
          </button>

          <Link to="/register" className="form__reg">
            Click here to register
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
