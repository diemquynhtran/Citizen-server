import { defaultRouter } from "helpers/defaultRouter";
import { useAuthorize } from "hocs/useAuthorize";
import AdminLayout from "layouts/AdminLayout";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { RootState } from "redux/store";
import A1SearchPage from "./A1SearchPage";
import A2SearchPage from "./A2SearchPage";
import A3SearchPage from "./A3SearchPage";
import B1SearchPage from "./B1SearchPage";
const routers = [
  {
    path: "/searchperson/A1",
    component: A1SearchPage,
  },
  {
    path: "/searchperson/A2",
    component: A2SearchPage,
  },
  {
    path: "/searchperson/A3",
    component: A3SearchPage,
  },
  {
    path: "/searchperson/B1",
    component: B1SearchPage,
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
