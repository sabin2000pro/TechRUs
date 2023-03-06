export interface IPaymentsParams {
    orderId: string
    amount: string
    currency: string
    paymentMethod: string
    stripePaymentId: string;
    stripeChargeId: string;
}