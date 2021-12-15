import { Expose } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { District } from "./district";
import { User } from "./user";

@Entity()
export class Province {
  @Expose()
  @PrimaryColumn()
  code: string;
  @Expose()
  @Column({ nullable: false, unique: true })
  name: string;
  @OneToMany(() => District, (district) => district.province)
  districts: District[];
  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  admin: User;
  // có 1 tài khoản : 1 : 1
  // có nhiều district
}
