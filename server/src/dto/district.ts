import { Expose } from "class-transformer";
import { Province } from "../entities/province";
import { UserTitleDto } from "./user";

export class DistrictTitle {
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  admin: UserTitleDto;
  @Expose()
  state: Boolean;
  @Expose()
  province: Province;
}
