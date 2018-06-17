/*
Modelo para descuentos
*/
export class ProductOffers {
    constructor(
        public product_id: string | Blob,
        public customer_group_id: string | Blob = '2',
        public quantity: string | Blob,
        public price: string | Blob,
        public date_start: string | Blob,
        public date_end: string | Blob,
        public product_special_id?: string | Blob,
        public product_discount_id?: string | Blob,
        public priority?: string | Blob,
    ) {}
}
