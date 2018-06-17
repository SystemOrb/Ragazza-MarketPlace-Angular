export class WeightType {
    constructor(
        public weight_class_id: string | Blob,
        public language_id: any = 1,
        public title: string,
        public unit: string
    ) {}
}
