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
import Admin from "./components/Admin";
import Cart from "./components/Cart";
import GlobalState from "./context/GlobalState";
class App extends Component {
  render() {
    return (
      <GlobalState>
        <Router>
          <div className="App">
            <Route path="/" component={Header} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
             <Route exact path="/" component={Main} />
            <Route exact path="/about" component={Map} />

            <Route exact path="/products/:id" component={ProductDetails} />

            <Route
              exact
              path="/userprofile"
              component={() => (
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              )}
            />

            <Route
              path="/admin"
              component={() => (
                <ProtectedRoute>
                  <Admin/>
                </ProtectedRoute>
              )}
            />
            <Route exact path="/cart" component={() => <Cart />} /> 
            <Route path="/" component={Footer} />
          </div>
        </Router>
      </GlobalState>
    );
  }
}

export default App;
