import { ProductData } from './product-data.class';
import { ProductDescription } from './product-description.class';
import { UserShop } from '../empresas.class';

export class CartItems {
    constructor (
        public cart_code: string,
        public cart_product: ProductData,
        public cart_price: number,
        public cart_client_id: number,
        public quantity: number,
        public date: string,
        public option: string,
        public store?: UserShop,
        public cart_info?: ProductDescription
    ) {}
}
