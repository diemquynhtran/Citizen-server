import { Expose } from "class-transformer";

export class UserTitleDto {
  @Expose()
  id: string;
  // @Expose()
  // password: string;
  @Expose()
  displayName: string;
  @Expose()
  permission: Boolean;
  @Expose()
  phoneNumber: string;
  @Expose()
  startTime: Date;
  @Expose()
  endTime: Date;}
