import React, { Component } from "react";
import "./final project/assets/styles/index.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer"
import AuthMethods from "./components/utils/AuthMethods";
import ProtectedRoute from './components/utils/ProtectedRoute';
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
    AuthMethods.logout();
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

          <ProtectedRoute exact path="/userProfile" component={props => (<UserProfile {...props} user={this.state.user}/>)}/> />
          <ProtectedRoute path='/123' component={Login}/>
          <Route path="/" component={Footer}/>
        </div>
      </Router>
    );
  }
}

export default App;
