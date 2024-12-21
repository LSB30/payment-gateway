import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

const createTransactionSchema = z.object({
  cardNumber: z
    .string()
    .min(13, "Card number must be between 13 and 19 digits")
    .max(19, "Card number must be between 13 and 19 digits")
    .regex(/^\d+$/, "Card number must contain only numbers"),

  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiration date must be in format MM/YY"
    ),

  cvv: z
    .string()
    .length(3, "CVV must be exactly 3 digits")
    .regex(/^\d+$/, "CVV must contain only numbers"),

  amount: z
    .number()
    .min(0.01, "Amount must be greater than 0")
    .max(999999.99, "Amount exceeds maximum allowed value"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password exceeds maximum length of 50 characters"),

  marchantId: z
    .string()
    .min(1, "Merchant ID is required")
    .max(50, "Merchant ID exceeds maximum length of 50 characters"),
});

export const ValidateTransaction = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const validationResult = createTransactionSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Invalid request parameters",
        errors,
      });
    }
    req.body = validationResult.data;
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
