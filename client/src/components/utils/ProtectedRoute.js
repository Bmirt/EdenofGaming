import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthMethods from "./AuthMethods";
const ProtectedRoute = ({ conponent: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (AuthMethods.getJWT()) {
            alert('hello')
          console.log(AuthMethods.getJWT());
          return <Component {...props} />;
        } else {
            console.log('in aprotected route')
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
export default ProtectedRoute;
