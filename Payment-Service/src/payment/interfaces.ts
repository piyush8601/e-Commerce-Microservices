export interface CreateCheckoutSessionRequest {
  orderId: string;
  amount: number;
  currency: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  paymentUrl: string;
}

export interface CreateRefundRequest {
  orderId: string;
  sessionId: string;
}

export interface CreateRefundResponse {
  refund_id: string;
  status: string;
}