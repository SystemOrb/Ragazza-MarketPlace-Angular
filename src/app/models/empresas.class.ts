export class UserShop {
    constructor(
        public shop_email: string,
        public shop_password?: string,
        public shop_id?: string,
        public shop_name?: string,
        public customer_group_id?: string,
        public shop_address?: string,
        public shop_phone?: string,
        public shop_date_added?: string
    ) {}
}
