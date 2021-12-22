import { Expose } from "class-transformer";
import {
  Entity,
  Column,
  ManyToOne,
  Generated,
  PrimaryColumn,
  BeforeInsert,
  CreateDateColumn,
} from "typeorm";
import { District } from "./district";
import { Province } from "./province";
import { Village } from "./village";
import { Ward } from "./ward";
import * as bcrypt from "bcrypt";
import { Gender } from "./person";

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
  @Column({
    default: true,
  })
  permission: Boolean;
  @Expose()
  @Column({ nullable: false })
  displayName: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true })
  startTime: Date;
  @Column({ nullable: true })
  endTime: Date;
  @CreateDateColumn()
  @Expose()
  createdAt: Date;
  @Column({
    default: Gender.FEMALE,
  })
  @Expose()
  gender: Gender;
  @ManyToOne(() => Ward)
  ward: Ward;
  @ManyToOne(() => District)
  district: District;
  @ManyToOne(() => Province)
  province: Province;
  @ManyToOne(() => Village)
  village: Village;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
    }
  }
}
