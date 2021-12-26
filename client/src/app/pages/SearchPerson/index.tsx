import { defaultRouter } from "helpers/defaultRouter";
import { useAuthorize } from "hocs/useAuthorize";
import AdminLayout from "layouts/AdminLayout";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { RootState } from "redux/store";
import A1SearchPerson from "./A1SearchPerson";
import A2SearchPerson from "./A2SearchPerson";
import A3SearchPerson from "./A3SearchPerson";
import B1SearchPerson from "./B1SearchPerson";
const routers = [
  {
    path: "/searchperson/A1",
    component: A1SearchPerson,
  },
  {
    path: "/searchperson/A2",
    component: A2SearchPerson,
  },
  {
    path: "/searchperson/A3",
    component: A3SearchPerson,
  },
  {
    path: "/searchperson/B1",
    component: B1SearchPerson,
  },
];
const SearchPerson: React.FC = () => {
  useAuthorize();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const route = defaultRouter(userInfo?.role);
  return (
    <div id="admin-page">
      <AdminLayout>
        <Switch>
          {routers.map(({ component, path }, i) => (
            <Route key={i} path={path} component={component} />
          ))}
          <Redirect from="/searchperson/" to={route} />
        </Switch>
      </AdminLayout>
    </div>
  );
};

export default SearchPerson;
