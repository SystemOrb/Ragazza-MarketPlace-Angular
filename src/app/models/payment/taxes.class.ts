export class Taxes {
    constructor(
        public kind: string,
        public amount: string | number,
        public base: string | number
    ) {}
}
