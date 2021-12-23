import { defaultRouter } from "helpers/defaultRouter";
import { useAuthorize } from "hocs/useAuthorize";
import AdminLayout from "layouts/AdminLayout";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { RootState } from "redux/store";
import A1ManagePage from "./A1Manage";
import A2ManagePage from "./A2Manage";
import A3ManagePage from "./A3Manage";
import B1ManagePage from "./B1Manage";
const routers = [
  {
    path: "/manage/A1",
    component: A1ManagePage,
  },
  {
    path: "/manage/A2",
    component: A2ManagePage,
  },
  {
    path: "/manage/A3",
    component: A3ManagePage,
  },
  {
    path: "/manage/B1",
    component: B1ManagePage,
  },
];
const ManagePage: React.FC = () => {
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

export default ManagePage;