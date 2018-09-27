export class Clothing {
    constructor(
        public patner: number,
        public productId: number,
        public itemName: string,
        public itemModel: string,
        public itemPrice: string,
        public itemCategory: number | string,
        public image: string,
        public quantity: number,
        public date_payment: Date | string
    ) {
    }
}
