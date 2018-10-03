export class TemplatePayment {
    constructor (
        public firstname: string,
        public lastname: string,
        public email: string,
        public city: string,
        public payment_address: string,
        public payment_address_2: string,
        public payment_country_id: string | number,
        public payment_zone_id: string | number,
        public payment_postcode: string,
    ) {}
}
