import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, currentUser, exact, strict, path, ...rest }) => {
    console.log(currentUser)
  return (
    <Route
    exact={exact}
    strict={strict}
    path={path}
      render={() => {
        return currentUser ? (
          <Component currentUser={currentUser} {...rest}/>
        ) : (
          <Redirect to="/signin" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;