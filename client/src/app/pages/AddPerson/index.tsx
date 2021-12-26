import { defaultRouter } from "helpers/defaultRouter";
import { useAuthorize } from "hocs/useAuthorize";
import AdminLayout from "layouts/AdminLayout";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { RootState } from "redux/store";
import B1AddPerson from "./B1AddPerson";

const AddPerson: React.FC = () => {
  useAuthorize();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const route = defaultRouter(userInfo?.role);
  return (
    <div id="admin-page">
      <AdminLayout>
		<B1AddPerson />
      </AdminLayout>
    </div>
  );
};

export default AddPerson;
