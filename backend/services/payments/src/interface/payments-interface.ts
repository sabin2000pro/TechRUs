export interface IPaymentIntent {
    orderId: string
    amount: number
    currency: string
    paymentMethod: string
}

export interface IStripePaymentParams {
    paymentIntentId: string;
    clientSecret: string
}