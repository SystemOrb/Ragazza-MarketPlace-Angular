import { Taxes } from './taxes.class';
import { Details } from './details.taxes.class';
import { Items } from './items.class';
import { Shipping } from './shipping.class';

/*
Modelo que abarca los detalles de amount de PlacetoPay
*/
export class Amount {
    constructor(
        public taxes: Taxes[],
        public details: Details[],
    ) {}
}
