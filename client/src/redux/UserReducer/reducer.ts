import { UserInfo, UserRedux } from "models/user";
import { ActionReducer } from "redux/model";
import { UserActcion } from "./action";

const initialState: UserRedux = {
  accessToken: "",
};
export const UserReducer = (
  state = initialState,
  action: ActionReducer<UserActcion, UserRedux>
) => {
  switch (action.type) {
    case UserActcion.LogOut:
      localStorage.removeItem("token");
      return { token: "" };
    case UserActcion.Login:
      localStorage.setItem("token", action.payload?.accessToken as any);
      return { ...action.payload };
    case UserActcion.EmailConfirm:
      let userInfo = { ...state }.userInfo;

      return {
        ...state,
        userInfo: { ...(userInfo as UserInfo), emailConfirmed: true },
      };
    case UserActcion.UpdateUser:
      return {
        ...state,
        userInfo: action.payload?.userInfo,
      };
    default:
      return state;
  }
};
