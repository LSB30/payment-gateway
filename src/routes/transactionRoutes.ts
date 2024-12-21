import { Router } from "express";
import { TransactionController } from "../controllers/transactionController";
import { TransactionService } from "../services/transactionService";
import { ValidateTransaction } from "../middleware/transacationMiddleware";

const routes = Router();

const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService)

routes.post("/transaction", ValidateTransaction, (req, res, next) => transactionController.createTransaction(req, res, next));

export default routes;
