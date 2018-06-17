/*
Modelo para las imagenes de un producto
*/
export class ProductImages {
    constructor(
        public product_id: string | Blob,
        public image: string | File,
        public product_image_id?: string | Blob,
        public sort_order: string | Blob = '0'
    ) {}
}
