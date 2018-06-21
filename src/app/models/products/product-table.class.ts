export class ProductsTable {
    constructor(
        public user_id: string | number,
        public product_id: string | Blob,
        public image: string,
        public model: string,
        public price: string | number,
        public quantity: string | number,
        public status: string | boolean,
        public name: any
    ) {}
}
