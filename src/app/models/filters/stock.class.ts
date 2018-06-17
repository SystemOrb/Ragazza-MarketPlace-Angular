export class StockType {
    constructor(
        public stock_status_id: string | Blob,
        public language_id: any = 1,
        public name: string
    ) {}
}
