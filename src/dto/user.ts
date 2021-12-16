import { Expose } from "class-transformer";

export class UserTitleDto {
  @Expose()
  id: string;
  @Expose()
  password: string;
  @Expose()
  displayName: string;
  @Expose()
  phoneNumber: string;
}
