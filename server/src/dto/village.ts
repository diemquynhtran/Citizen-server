import { Expose } from "class-transformer";
import { Province } from "../entities/province";
import { Ward } from "../entities/ward";
import { UserTitleDto } from "./user";

export class VillageTitle {
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  admin: UserTitleDto;
  @Expose()
  state: Boolean;
  @Expose()
  ward: Ward
}
