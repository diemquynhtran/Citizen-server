import { defaultRouter } from "helpers/defaultRouter";
import { useAuthorize } from "hocs/useAuthorize";
import AdminLayout from "layouts/AdminLayout";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { RootState } from "redux/store";
import A1AdminPage from "./A1Admin";
import A2AdminPage from "./A2Admin";
import A3AdminPage from "./A3Admin";
import B1AdminPage from "./B1Admin";
const routers = [
  {
    path: "/admin/A1",
    component: A1AdminPage,
  },
  {
    path: "/admin/A2",
    component: A2AdminPage,
  },
  {
    path: "/admin/A3",
    component: A3AdminPage,
  },
  {
    path: "/admin/B1",
    component: A3AdminPage,
  },
  {
    path: "/admin/B1",
    component: B1AdminPage,
  },
];
const AdminPage: React.FC = () => {
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
          <Redirect from="/admin" to={route} />
        </Switch>
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
