import React, { Component } from "react";
import "./final project/assets/styles/index.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";
import AuthMethods from "./components/utils/AuthMethods";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Map from "./components/Map";
import ProductDetails from "./components/ProductDetails";
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
    this.setState({ user: null });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            component={props => (
              <Header {...props} user={this.state.user} logout={this.logout} />
            )}
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
          <Route exact path="/about" component={Map} />

          <Route exact path="/products/:id" component={ProductDetails} />

          {/* <ProtectedRoute
            exact
            path="/userProfile"
            render={props => (
              <UserProfile {...props} user={this.state.user} />
            )}
          /> */}
          <Route exact path="/userprofile" component={()=><ProtectedRoute><UserProfile user={this.state.user}/></ProtectedRoute>}/>
            
         
          <Route path="/" component={Footer} />
        </div>
      </Router>
    );
  }
}

export default App;
