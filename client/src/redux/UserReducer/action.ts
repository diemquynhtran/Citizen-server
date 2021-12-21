import { UserInfo, UserRedux } from "models/user";

export enum UserActcion {
  Login = "Login",
  LogOut = "Logout",
  EmailConfirm = "EmailConfirm",
  UpdateUser = "UpdateUser",
}
export const UserFunction = {
  login: (user: UserRedux) => {
    return { type: UserActcion.Login, payload: user };
  },
  logout: () => {
    return { type: UserActcion.Login };
  },
  activeAccount: () => {
    return { type: UserActcion.EmailConfirm };
  },
  updateUser: (userInfo: UserInfo) => {
    return { type: UserActcion.UpdateUser, payload: { userInfo } };
  },
};
