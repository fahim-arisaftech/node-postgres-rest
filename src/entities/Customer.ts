import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('customer')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: "simple-json" })
  info: {
    age: number;
    hair_color: string;
  }

  @Column({ type: "simple-json" })
  address: {
    address: string;
    city: string;
    province: string;
    postcode: string;
  }

  @Column({ type: "simple-array" })
  family_members: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}