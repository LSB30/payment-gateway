import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TransactionDto } from "../dto/transactionDto";

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

  static fromDTO(dto: TransactionDto): TransactionEntity {
    const entity = new TransactionEntity();
    entity.cardNumber = dto.cardNumber;
    entity.amount = dto.amount;
    entity.cvv = dto.cvv;
    entity.expirationDate = dto.expirationDate;
    entity.password = dto.password;
    entity.marchantId = dto.marchantId;
    entity.status = "PENDING";
    entity.validationResult = "Processing"
    return entity;
  }
}
