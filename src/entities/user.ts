import { UUID } from "bson";
import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { District } from "./district";
import { Province } from "./province";
import { Village } from "./village";
import { Ward } from "./ward";
enum Role {
  A1,
  A2,
  A3,
  B1,
  B2,
}
@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: UUID;
  @Column()
  role: Role;
  @Expose()
  @Column()
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
