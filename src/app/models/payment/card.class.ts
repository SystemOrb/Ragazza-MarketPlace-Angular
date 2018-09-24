export class Card {
    constructor(
        public name: string,
        public number: number | string,
        public expiryMonth: number | string,
        public expiryYear: number | string,
        public cvv: number | string
    ) {}
}
