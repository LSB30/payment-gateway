import { TransactionService } from "../services/transactionService";
import { Request, Response, NextFunction } from "express";
import { ApiResponse, transactionResponse } from "../types/apiResponse";
import { ZodError } from "zod";

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const transaction = req.body;

      
      const result = await this.transactionService.createTransaction(
        transaction
      );

      res.status(201).json({
        success: true,
        message: "Payment made successfully",
        data: result,
      } as ApiResponse<transactionResponse>);
    } catch (error: unknown) {
      console.error('Transaction error:', error);
      
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: "Payment processing failed",
          details: error.errors,
        });
        return;
      }

      if (error instanceof Error && error.message === "Card number already registered") {
        res.status(400).json({
          success: false,
          message: "Invalid card",
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Payment processing failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
}
