import { defaultRouter } from "helpers/defaultRouter";
import { useAuthorize } from "hocs/useAuthorize";
import AdminLayout from "layouts/AdminLayout";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { RootState } from "redux/store";
import A1StatPage from "./A1Stat";
import A2StatPage from "./A2Stat";
import A3StatPage from "./A3Stat";
import B1StatPage from "./B1Stat";
const routers = [
  {
    path: "/stat/A1",
    component: A1StatPage,
  },
  {
    path: "/stat/A2",
    component: A2StatPage,
  },
  {
    path: "/stat/A3",
    component: A3StatPage,
  },
  {
    path: "/stat/B1",
    component: B1StatPage,
  },
];
const StatPage: React.FC = () => {
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
          <Redirect from="/stat" to={route} />
        </Switch>
      </AdminLayout>
    </div>
  );
};

export default StatPage;
