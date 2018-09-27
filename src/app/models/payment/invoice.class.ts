import { Clothing } from './clothing.class';
export class InvoiceCheck {
    constructor (
        public cart_id: string,
        public totalAmount: number,
        public customer: number | string,
        public clothing: Clothing[],
        public tax: number
    ) {}
}
