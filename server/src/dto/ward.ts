import { Expose } from "class-transformer";
import { District } from "../entities/district";
import { UserTitleDto } from "./user";

export class WardTitle {
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  admin: UserTitleDto;
  @Expose()
  state: Boolean;
  @Expose()
  district: District
}
