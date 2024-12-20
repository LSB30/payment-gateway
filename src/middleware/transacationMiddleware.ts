import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

const CreateTransactionSchema = z.object({
  cardNumber: z.string().min(16, "Card invalid"),
  expirationDate: z.string(),
  cvv: z.string().min(3),
  amount: z.number().min(1),
  password: z.string().optional(),
  marchantId: z.string(),
});

export const ValidateTransaction = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    CreateTransactionSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
