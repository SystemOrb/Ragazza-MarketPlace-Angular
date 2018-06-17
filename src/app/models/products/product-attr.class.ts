export class ProductAttributes {
    constructor(
        public product_id: string | Blob,
        public filter_id?: string | Blob,
        public category_id?: string | Blob,
        public manufacturer_id?: string | Blob
    ) {}
}
