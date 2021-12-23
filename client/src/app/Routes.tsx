import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import NotPermisionPage from "./pages/403";
import AdminPage from "./pages/Admin";
import Login from "./pages/Login";
import ManagePage from "./pages/Manage";
const Routes = () => {
  return (
    <Switch>
      <Route path={"/admin"} component={AdminPage} />
<<<<<<< HEAD
	    <Route path={"/stat"} component={StatPage} />
      <Route path={"/manage"} component={ManagePage} />
=======
>>>>>>> d07715ef4e070a3d130d4fffce89166a26a2deb7
      <Route path={"/login"} exact component={Login} />
      <Route path={"/403"} exact component={NotPermisionPage} />
      <Redirect from="/" to="/admin" />
    </Switch>
  );
};

export default Routes;
