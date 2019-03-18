import React, { Component } from "react";
import "./final project/assets/styles/index.css"
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from './components/Register';
import Main from './components/Main'
import UserProfile from "./components/UserProfile";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" >
          <Route path="/" component={Header} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Main} />
          <Route exact path="/userProfile" component={UserProfile} />

        </div>
      </Router>
    );
  }
}

export default App;
