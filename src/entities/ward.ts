import { Expose } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { District } from "./district";
import { User } from "./user";
import { Village } from "./village";

@Entity()
export class Ward {
  @Expose()
  @PrimaryColumn()
  code: string;
  @Expose()
  @Column({ nullable: false, unique: true })
  name: string;
  @ManyToOne(() => District, (district) => district.wards)
  district: District;
  @OneToMany(() => Village, (v) => v.ward)
  villages: Village[];
  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  admin: User;
  // có 1 tài khoản : 1 : 1
  // có nhiều ward
}
