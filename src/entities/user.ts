import { UUID } from "bson";
import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: UUID;
  @Expose()
  @Column()
  firstName: string;
  @Expose()
  @Column()
  lastName: string;
  @Expose()
  @Column()
  age: number;
  @Expose()
  @Column()
  username: string;
  @Expose()
  @Column()
  password: string;
}
