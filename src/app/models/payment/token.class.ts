import { Card } from './card.class';
export class KushkiToken {
    constructor(
        public card: Card,
        public totalAmount: number | string,
        public currency?: string,
        public isDeferred?: boolean
    ) {}
}
