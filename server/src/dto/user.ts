import { Expose } from "class-transformer";
import { Gender } from "../entities/person";
import { Role } from "../entities/user";

export class UserTitleDto {
  @Expose()
  id: string;
  @Expose()
  displayName: string;
  @Expose()
  permission: Boolean;
  @Expose()
  phoneNumber: string;
  @Expose()
  startTime: Date;
  @Expose()
  endTime: Date;
  @Expose()
  role: Role;
  @Expose()
  createdAt: Date;
  @Expose()
  gender: Gender;
  @Expose()
  username: string;
}
