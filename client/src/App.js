import React, { Component } from "react";
import "./final project/assets/styles/index.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/UserPages/Register";
import IndividualProfile from "./components/UserPages/IndividualProfile";
import Main from "./components/Main/Main";
import UserProfile from "./components/UserPages/UserProfile";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Map from "./components/Main/Map";
import ProductDetails from "./components/Product/ProductDetails";
import Admin from "./components/UserPages/Admin";
import Cart from "./components/Main/Cart";
import GlobalState from "./context/GlobalState";
import ProductsPage from "./components/Product/ProductsPage";
class App extends Component {
  render() {
    return (
      <GlobalState>
        <Router>
          <div className="App">
            <Route path="*" component={Header} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Main} />
            <Route exact path="/about" component={Map} />

            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/products/:id" component={ProductsPage} />
            <Route
              exact
              path="/IndividualProfile"
              component={IndividualProfile}
            />

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
                  <Admin />
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
