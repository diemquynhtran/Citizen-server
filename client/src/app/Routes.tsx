import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import NotPermisionPage from "./pages/403";
import AdminPage from "./pages/Admin";
import Login from "./pages/Login";
import ManagePage from "./pages/Manage";
import AddPerson from "./pages/AddPerson";
import SearchPerson from "./pages/SearchPerson";

const Routes = () => {
  return (
    <Switch>
      <Route path={"/admin"} component={AdminPage} />
      <Route path={"/manage"} component={ManagePage} />
      <Route path={"/login"} exact component={Login} />
      <Route path={"/403"} exact component={NotPermisionPage} />
	    <Route path={"/addperson"} exact component={AddPerson} />
	    <Route path={"/searchperson"}  component={SearchPerson} />
    <Redirect from="/" to="/admin" /> 
    </Switch>
  );
};

export default Routes;
