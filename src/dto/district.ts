import { Expose } from "class-transformer";
import { UserTitleDto } from "./user";

export class DistrictTitle {
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  admin: UserTitleDto;
}
