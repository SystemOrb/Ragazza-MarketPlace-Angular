import { PayerUser } from './payer.class';
import { Payment } from './payment.class';
import { UserAddress } from './address.class';
import { Amount } from './amount.class';
export class Request {
    constructor(
        public locale: string,
        public payer: PayerUser,
        public buyer: PayerUser,
        public shipping: UserAddress,
        public payment: Payment,
        public amount: Amount,
        public expiration: Date | any,
        public ipAddress: string,
        public userAgent: string,
        public returnUrl: string,
        public cancelUrl: string,
        public skipResult: boolean | any,
        public noBuyerFill: boolean | any,
        public captureAddress: boolean | any,
        public paymentMethod?: any
    ) {}
}
