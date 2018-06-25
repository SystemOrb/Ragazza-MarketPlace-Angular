import { UserAddress } from './address.class';
export class PayerUser {
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public documentType: string,
        public document: string,
        public mobile?: string,
        public address?: UserAddress[] | any
    ) {}
}
