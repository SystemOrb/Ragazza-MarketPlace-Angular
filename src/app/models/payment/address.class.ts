export class UserAddress {
    constructor(
        public street: string,
        public city: string,
        public state: string,
        public postalcode: string,
        public country: string,
        public phone: string | number
    ) {}
}
