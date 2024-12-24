import { AppDataSource } from "./../database/data-source";
import { TransactionDto } from "../dto/transactionDto";
import { TransactionEntity } from "../entities/transactionEntity";
import { sendMessage } from "../utils/kafkaProducer";

export class TransactionService {
  private transactionRepository =
    AppDataSource.getRepository(TransactionEntity);

  async createTransaction(
    transactionDto: TransactionDto
  ): Promise<TransactionEntity> {
    // Verifica se o número do cartão já está registrado
    const existingTransaction = await this.transactionRepository.findOne({
      where: { cardNumber: transactionDto.cardNumber },
    });

    if (existingTransaction) {
      throw new Error("Card number already registered");
    }

    const transaction = TransactionEntity.fromDTO(transactionDto);

    try {
      // Envia a mensagem para o Kafka
      await sendMessage("transaction-processed", {
        id: transaction.id,
        cardNumber: transaction.cardNumber,
        amount: transaction.amount,
        cvv: transaction.cvv,
        expirationDate: transaction.expirationDate,
        password: transaction.password,
        marchantId: transaction.marchantId,
        status: transaction.status,
        validationResult: transaction.validationResult,
      });

      console.log("Mensagem enviada ao Kafka com sucesso");
    } catch (error) {
      console.error("Erro ao enviar mensagem para o Kafka:", error);
      // Opcional: Lidar com o erro, como registrar logs ou reverter a transação
    }

    // Cria a entidade Transaction a partir do DTO e salva no banco
    const entity = await this.transactionRepository.save(transaction);
    return entity;
  }
}
