export class Push {
    constructor(
        public employ_id: string | Blob,
        public message?: string,
        public from_id?: string | Blob,
        public date?: string | Blob,
        public ntf_id?: string | Blob
    ) {}
}
