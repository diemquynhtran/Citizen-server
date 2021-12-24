import { Expose } from "class-transformer";
import { Address } from "../entities/address";
import { Gender } from "../entities/person";
import { Role } from "../entities/user";
import { UserTitleDto } from "./user";

export class PersonTitleDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  birthDay: Date;
  @Expose()
  gender: Gender;
  @Expose()
  religion: string;
  @Expose()
  level: number;
  @Expose()
  job: string;
  @Expose()
  defaultAddress: Address;
  @Expose()
  otherAddress: Address;
}
