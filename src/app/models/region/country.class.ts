export class Country {
    constructor (
        public country_id: number,
        public name: string,
        public iso_code_2: string,
        public iso_code_3: string,
        public address_format?: string,
        public postcode_required?: boolean,
        public status?: boolean
    ) {}
}
