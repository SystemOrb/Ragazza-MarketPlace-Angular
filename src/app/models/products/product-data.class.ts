/*
Class de modelo para la data de un producto
Carlos Estarita
*/
export class ProductData {
    constructor(
        public user_id: string,
        public model: string,
        public price: string | Blob,
        public quantity: string | Blob,
        public sku?: string,
        public upc?: string,
        public ean?: string,
        public jan?: string,
        public isbn?: string,
        public mpn?: string,
        public stock_status_id?: string | Blob,
        public image?: string | File,
        public manufacturer_id?: string | Blob,
        public shipping?: string,
        public weight?: string | Blob,
        public weight_class_id?: string | Blob,
        public length?: string | Blob,
        public width?: string | Blob,
        public height?: string | Blob,
        public length_class_id?: string | Blob,
        public minimum?: string | Blob,
        public status?: string | Blob,
        public viewed?: string | Blob,
        public product_id?: string | Blob,
        public date_added?: string | Blob | Date,
        public date_modied?: string | Blob | Date
    ) {}
}
