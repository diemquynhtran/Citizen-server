import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import NotPermisionPage from "./pages/403";
import AdminPage from "./pages/Admin";
import Login from "./pages/Login";
const Routes = () => {
  return (
    <Switch>
      <Route path={"/admin"} component={AdminPage} />
      <Route path={"/login"} exact component={Login} />
      <Route path={"/403"} exact component={NotPermisionPage} />
      <Redirect from="/" to="/admin" />
    </Switch>
  );
};

export default Routes;
