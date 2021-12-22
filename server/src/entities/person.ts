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
} from "typeorm";
import { Address } from "./address";
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
  @Column()
  @Index()
  uid: string;
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

  @Column({ default: 1 })
  level: number;
  @Column({ default: "", nullable: false })
  job: string;
  // địa chỉ tạm trú : adrdess 1 : 0
  @OneToOne(() => Address, { onDelete: "SET NULL" })
  @JoinColumn()
  defaultAddress: Address;
  @OneToOne(() => Address, { onDelete: "SET NULL" })
  @JoinColumn()
  otherAddress: Address;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  // địa chỉ thường trú : address 1 :
}
