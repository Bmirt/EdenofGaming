import React, { Component } from "react";
import "./final project/assets/styles/index.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import UserProfile from "./components/UserProfile";
import AuthMethods from "./components/utils/AuthMethods";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: AuthMethods.getCurrentUser() || null
    };
  }

  updateUserState = username => {
    this.setState({ user: username });
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({user : null});
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            component={props => <Header {...props} user={this.state.user} logout={this.logout}/>}
          />
          <Route
            exact
            path="/login"
            component={props => (
              <Login {...props} updateUserState={this.updateUserState} />
            )}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Main} />
          <Route exact path="/userProfile" component={UserProfile} />
        </div>
      </Router>
    );
  }
}

export default App;
