import { useRole } from "hocs/useRole";
import React from "react";
import { Role } from "settings/role";

const A2StatPage = () => {
  useRole(Role.A2);
  return <div>A2 adminpage</div>;
};

export default A2StatPage;
