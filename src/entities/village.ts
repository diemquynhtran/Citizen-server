import { Expose } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user";
import { Ward } from "./ward";
enum Status {
  YET,
  DONE,
}
@Entity()
export class Village {
  @Expose()
  @PrimaryColumn()
  code: string;
  @Expose()
  @Column({ nullable: false, unique: true })
  name: string;
  @ManyToOne(() => Ward, (ward) => ward.villages, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  ward: Ward[];
  @Column({ default: Status.YET })
  status: Status;
  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  admin: User;
  // trỏ tới 1 provinceId
  // có 1 tài khoản : 1 : 1
  // có nhiều ward
}
