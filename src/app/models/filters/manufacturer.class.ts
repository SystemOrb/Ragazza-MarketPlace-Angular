export class ManufacturerType {
    constructor(
        public manufacturer_id: string | Blob,
        public name: string,
        public image: string,
        public sort_order?: string
    ) {}
}
