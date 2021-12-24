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
  @Expose()
  @Column()
  role: Role;
  @Expose()
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Expose()
  @Column({
    default: true,
  })
  permission: Boolean;
  @Expose()
  @Column({ nullable: false })
  displayName: string;
  @Expose()
  @Column({ nullable: true })
  phoneNumber: string;
  @Expose()
  @Column({ nullable: true })
  startTime: Date;
  @Expose()
  @Column({ nullable: true })
  endTime: Date;
  @CreateDateColumn({nullable: true})
  @Expose()
  createdAt: Date;
  @Column({default: Gender.FEMALE,})
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
