import { useRole } from "hocs/useRole";
import React from "react";
import { Role } from "settings/role";

const A1AdminPage = () => {
  useRole(Role.A1);
  return <div>A1 adminpage</div>;
};

export default A1AdminPage;
