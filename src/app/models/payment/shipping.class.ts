import { UserAddress } from './address.class';
export class Shipping {
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public documentType?: string,
        public document?: string,
        public mobile?: string | number,
        public address?: UserAddress
    ) {}
}
