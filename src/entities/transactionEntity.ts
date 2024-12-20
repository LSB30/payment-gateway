import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "transactions_logs" })
export class TransactionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true, length: 16 })
  cardNumber: string;

  @Column({ type: "varchar", length: 5 })
  expirationDate: string;

  @Column({ type: "varchar", length: 3 })
  cvv: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "varchar", length: 50 })
  password: string;

  @Column({ type: "varchar", length: 50 })
  marchantId: string;

  @Column({ type: "varchar", length: 20 })
  status: string;

  @Column({ type: "varchar", length: 255 })
  validationResult: string;
}
