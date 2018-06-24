export class Items {
    constructor(
        public sku: string,
        public name: string,
        public category: string,
        public qty: string,
        public price: string | number,
        public tax?: string | number
    ) {}
}
