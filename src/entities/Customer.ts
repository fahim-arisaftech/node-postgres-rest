import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany } from "typeorm"
import { Transaction } from "./Transaction";
import { Banker } from "./Banker";
import { Personal } from "./utils/Personal";

@Entity('customer')
export class Customer extends Personal {

  @Column({ type: "numeric", default: 0 })
  balance: number;

  @Column({ type: "simple-json", nullable: true })
  info: {
    age: number;
    hair_color: string;
  }

  @Column({ type: "simple-json", nullable: true })
  address: {
    address: string;
    city: string;
    province: string;
    postcode: string;
  }

  @Column({ type: "simple-array", default: [] })
  family_members: string[];

  @OneToMany(
    () => Transaction,
    transaction => transaction.customer,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn({ name: "customer_transactions" })
  transactions: Transaction[];

  @ManyToMany(() => Banker,
    {
      cascade: true,
    }
  )
  bankers: Banker[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}