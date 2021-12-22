import { history } from "helpers/history";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export const useAuthorize = () => {
  const { accessToken } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken]);
};
