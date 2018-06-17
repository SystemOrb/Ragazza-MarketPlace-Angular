export class CategoryType {
    constructor(
        public category_id: string | Blob,
        public language_id?: string | Blob,
        public name?: string,
        public description?: string,
        public meta_title?: string,
        public meta_description?: string,
        public meta_keyword?: string
    ) {}
}
