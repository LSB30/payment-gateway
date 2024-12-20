import { Repository } from "typeorm";
import { TransactionEntity } from "../entities/transactionEntity";

export class TransactionRepository {
  private repository: Repository<TransactionEntity>;

  constructor(repository: Repository<TransactionEntity>) {
    this.repository = repository;
  }

  async findByStatus(status: string): Promise<TransactionEntity[]> {
    return this.repository.find({ where: { status } });
  }

  async findByMerchantId(merchantId: string): Promise<TransactionEntity[]> {
    return this.repository.find({ where: { marchantId: merchantId } });
  }
}
