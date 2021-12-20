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
import { Province } from "./province";
import { User } from "./user";
import { Ward } from "./ward";

@Entity()
export class District {
  @Expose()
  @PrimaryColumn()
  code: string;
  @Expose()
  @Column({ nullable: false, unique: true })
  name: string;
  @Column({default: false})
  state: Boolean;
  @ManyToOne(() => Province, (province) => province.districts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  province: Province;
  // trỏ tới 1 provinceId
  // có 1 tài khoản : 1 : 1
  // có nhiều ward
  @OneToMany(() => Ward, (word) => word.district)
  wards: Ward;
  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  admin: User;
}
