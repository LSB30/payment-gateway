import { Repository } from "typeorm";
import { TransactionDto } from "../dto/transactionDto";
import { TransactionEntity } from "../entities/transactionEntity";

export class TransactionService {
  constructor(private transactionRepository: Repository<TransactionEntity>) {}

  async createTransaction(transactionDto: TransactionDto): Promise<void> {
    const transacation = TransactionEntity.fromDTO(transactionDto);

    await this.transactionRepository.save(transacation);
  }
}
