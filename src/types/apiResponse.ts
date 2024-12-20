export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: any;
}

export interface transactionResponse {
  status: string;
  validationResult: string;
}
