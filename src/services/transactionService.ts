import { AppDataSource } from "./../database/data-source";
import { TransactionDto } from "../dto/transactionDto";
import { TransactionEntity } from "../entities/transactionEntity";

export class TransactionService {
  private transactionRepository =
    AppDataSource.getRepository(TransactionEntity);

  async createTransaction(
    transactionDto: TransactionDto
  ): Promise<TransactionEntity> {
    console.log("service");
    const transacation = TransactionEntity.fromDTO(transactionDto);

    console.log(transacation);
    const entity = await this.transactionRepository.save(transacation);
    console.log(entity);

    return entity;
  }
}
