import { Amount } from './amount.class';
import { Items } from './items.class';
import { Shipping } from './shipping.class';

export class Payment {
    constructor(
        public reference: string,
        public description: string,
        public amount: Amount | any,
        public items: Items[] | any,
        public shipping: Shipping | any,
        public allowPartial: boolean | any
    ) {}
}
