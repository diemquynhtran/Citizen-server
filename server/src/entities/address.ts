import { UUID } from "bson";
import { Expose } from "class-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { District } from "./district";
import { Province } from "./province";
import { User } from "./user";
import { Village } from "./village";
import { Ward } from "./ward";

@Entity()
export class Address {
  @Expose()
  @PrimaryGeneratedColumn()
  id: UUID;
  @Column({ default: null})
  detail: string;
  @ManyToOne(() => Ward)
  ward: Ward;
  @ManyToOne(() => District)
  district: District;
  @ManyToOne(() => Province)
  province: Province;
  @ManyToOne(() => Village)
  village: Village;
  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  admin: User;

  // trỏ tới 1 đỉa chỉ : phường , huyện, tỉnh
}
