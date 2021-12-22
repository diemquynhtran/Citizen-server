import { Expose } from "class-transformer";
import { Entity, Column, ManyToOne, Generated, PrimaryColumn, BeforeInsert } from "typeorm";
import { District } from "./district";
import { Province } from "./province";
import { Village } from "./village";
import { Ward } from "./ward";
import * as bcrypt from "bcrypt";

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
  @Column()
  role: Role;
  @Expose()
  @Column({ unique: true })
  username: string;
  @Expose()
  @Column()
  password: string;
  @Column({
    default: true,
  })
  permission: Boolean;
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

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
        this.password = await bcrypt.hash(this.password, 10);
    }
    catch (e) {
      console.log(e);
      
    }
  }

  // /**
  //  * isValidPassword
  //  */
  // public async isValidPassword(password: any) {
  //   try {
  //     return await bcrypt.compare(password, this.password)
  //   } catch (error) {
  //     throw error
  //   }
  // }
  
}

