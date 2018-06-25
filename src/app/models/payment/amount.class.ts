import { Taxes } from './taxes.class';
import { Details } from './details.taxes.class';

/*
Modelo que abarca los detalles de amount de PlacetoPay
*/
export class Amount {
    constructor(
        public taxes: Taxes | any,
        public details: Details | any,
        public currency: string,
        public total: string | Blob
    ) {}
}
