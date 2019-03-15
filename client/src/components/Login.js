import React from "react";

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <form action="" className="form login">
          <input
            type="text"
            name="name"
            required
            autocomplete="off"
            className="form__register"
          />
          <label for="name" className="form__label">
            Username
          </label>

          <input
            type="password"
            name="password"
            required
            autocomplete="off"
            className="form__register"
          />
          <label for="password" className="form__label password">
            Password
          </label>

          <button type="submit" className="form__submit " >Log In</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;