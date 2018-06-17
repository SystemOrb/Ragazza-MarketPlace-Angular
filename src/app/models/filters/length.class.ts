export class LengthType {
    constructor(
        public length_class_id: string | Blob,
        public language_id: any = 1,
        public title: string,
        public unit: string
    ) {}
}
