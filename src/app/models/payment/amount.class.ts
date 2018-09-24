export class Amount {
    constructor(
        public subtotalIva: number,
        public subtotalIva0?: number,
        public ice?: number,
        public iva?: number,
        public currency?: string
    ) {}
}
