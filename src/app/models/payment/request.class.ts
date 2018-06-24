import { PayerUser } from './payer.class';
import { Payment } from './payment.class';
export class Request {
    constructor(
        public locale: string,
        public payer: PayerUser,
        public buyer: PayerUser,
        public payment: Payment,
        public expiration: Date,
        public ipAddress: string,
        public userAgent: string,
        public returnUrl: string,
        public cancelUrl: string,
        public skipResult: boolean,
        public noBuyerFill: boolean,
        public captureAddress: boolean,
        public paymentMethod?: any
    ) {}
}
