import { Router } from "express";
import { TransactionController } from "../controllers/transactionController";
import { TransactionService } from "../services/transactionService";

const routes = Router();

const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService)

routes.post("/transaction", (req, res, next) => transactionController.createTransaction(req, res, next));

export default routes;
