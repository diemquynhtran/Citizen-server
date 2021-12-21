import { Gender } from "settings/gender";
import { Role } from "settings/role";

export interface UserInfo {
  id: string;
  username: string;
  displayName: string;
  createdAt: Date;
  birthDay: Date;
  gender: Gender;
  role: Role;
  phoneNumber?: string;
}
export interface UserRedux {
  accessToken?: string;
  userInfo?: UserInfo;
}
