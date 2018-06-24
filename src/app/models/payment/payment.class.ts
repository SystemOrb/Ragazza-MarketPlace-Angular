import { Amount } from './amount.class';
import { Items } from './items.class';
import { Shipping } from './shipping.class';

export class Payment {
    constructor(
        public reference: string,
        public description: string,
        public amount: Amount,
        public items: Items[],
        public shipping: Shipping,
        public allowPartial: boolean
    ) {}
}
