import { history } from "helpers/history";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Role } from "settings/role";

export const useRole = (...roles: Role[]) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!userInfo?.role || !roles.includes(userInfo?.role)) {
      return history.push("/403");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, userInfo?.role]);
};
