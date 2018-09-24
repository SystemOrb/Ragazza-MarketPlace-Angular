import { Amount } from './amount.class';
import { MetaData } from './metadata.class';
export class KushkiCharge {
    constructor (
        public token: string,
        public amount: Amount,
        public months: number,
        public metadata: MetaData,
        public fullResponse?: boolean
    ) {}
}
