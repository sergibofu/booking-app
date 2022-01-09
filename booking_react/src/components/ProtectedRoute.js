import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ element: Component, path, user, ...restOfProps }) {
  return (
    <Route path={path} element={user.loggedIn ? <Component {...restOfProps} /> : <div>Not logged in</div>}/>
  );
}

export default ProtectedRoute;