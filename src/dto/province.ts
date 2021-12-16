import { Expose } from "class-transformer";
import { UserTitleDto } from "./user";

export class ProvinceTitle {
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  admin: UserTitleDto;
}
