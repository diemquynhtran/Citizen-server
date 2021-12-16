import { Expose } from "class-transformer";
import { Entity, Column, ManyToOne, Generated, PrimaryColumn } from "typeorm";
import { District } from "./district";
import { Province } from "./province";
import { Village } from "./village";
import { Ward } from "./ward";
export enum Role {
  A1,
  A2,
  A3,
  B1,
  B2,
}
@Entity()
export class User {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;
  @Column()
  role: Role;
  @Expose()
  @Column({ unique: true })
  username: string;
  @Expose()
  @Column()
  password: string;
  @Expose()
  @Column({ nullable: false })
  displayName: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true })
  startTime: Date;
  @Column({ nullable: true })
  endTime: Date;
  @ManyToOne(() => Ward)
  ward: Ward;
  @ManyToOne(() => District)
  district: District;
  @ManyToOne(() => Province)
  province: Province;
  @ManyToOne(() => Village)
  village: Village;
}
