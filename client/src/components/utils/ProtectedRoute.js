import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthMethods from "./AuthMethods";
const ProtectedRoute = ({ conponent: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (AuthMethods.getJWT()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
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
