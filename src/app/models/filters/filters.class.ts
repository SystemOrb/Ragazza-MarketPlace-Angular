export class FilterType {
    constructor(
        public filter_id: string | Blob,
        public language_id?: string | Blob,
        public filter_group_id?: string | Blob,
        public name?: string
    ) {}
}
export class FilterGroup {
    constructor(
        public filter_group_id: string | Blob,
        public language_id?: string | Blob,
        public name?: string
    ) {}
}

