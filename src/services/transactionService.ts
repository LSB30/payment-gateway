import { AppDataSource } from "./../database/data-source";
import { TransactionDto } from "../dto/transactionDto";
import { TransactionEntity } from "../entities/transactionEntity";

export class TransactionService {
  private transactionRepository =
    AppDataSource.getRepository(TransactionEntity);

  async createTransaction(
    transactionDto: TransactionDto
  ): Promise<TransactionEntity> {
    // Check if card number already exists
    const existingTransaction = await this.transactionRepository.findOne({
      where: { cardNumber: transactionDto.cardNumber }
    });

    if (existingTransaction) {
      throw new Error("Card number already registered");
    }

    const transaction = TransactionEntity.fromDTO(transactionDto);
    const entity = await this.transactionRepository.save(transaction);
    return entity;
  }
}
