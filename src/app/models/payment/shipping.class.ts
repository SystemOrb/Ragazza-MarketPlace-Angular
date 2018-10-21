export class ShippingObject {
    constructor (
        public order_status_id: number,
        public name: string,
        public language_id?: number
    ) {}
}
