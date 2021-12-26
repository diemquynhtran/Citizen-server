import { UUID } from "bson";
import { Expose } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Address } from "./address";
import { User } from "./user";
export enum Gender {
  FEMALE,
  MALE,
}

@Entity()
export class Person {
  @Expose()
  @PrimaryGeneratedColumn()
  id: UUID;
  @Expose()
  @Column({nullable: true, unique: true})
  cmnd: string;
  @Column({ nullable: false })
  name: string;
  @Column()
  birthDay: Date;
  @Column({ default: Gender.FEMALE })
  gender: Gender;
  @Column({
    default: "Không",
    nullable: true,
  })
  religion: string;

  @Column()
  level: string;
  @Column({ default: "", nullable: false })
  job: string;
  @Column()
  admincode: string;
  // địa chỉ tạm trú : adrdess 1 : 0
  @OneToOne(() => Address, { onDelete: "SET NULL" })
  @JoinColumn()
  defaultAddress: Address;
  @OneToOne(() => Address, { onDelete: "SET NULL" })
  @JoinColumn()
  otherAddress: Address;
  @OneToOne(() => Address, { onDelete: "SET NULL" })
  @JoinColumn()
  hometown: Address;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  // địa chỉ thường trú : address 1 :
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  admin: User;
}
