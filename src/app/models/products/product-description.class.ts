export class ProductDescription {
    constructor(
        public product_id: string | Blob,
        public language_id: string | Blob,
        public name: string,
        public description: string,
        public tag: string,
        public user_id?: string | Blob,
        public meta_description?: string,
        public meta_keyword?: string,
        public meta_tags?: string
    ) {}
}
