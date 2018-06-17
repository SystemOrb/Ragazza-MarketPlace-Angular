import { Injectable, EventEmitter } from '@angular/core';
import { ProductService } from '../products/product.service';
import { ProductOffers } from '../../models/products/product-discount.class';
import { ProductImages } from '../../models/products/product-images.class';
declare const swal: any;
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public refreshTable = new EventEmitter<any>();
  constructor(private _product: ProductService) { }
  collection;
  offer: ProductOffers;
  imagePopup: boolean = false;
  /**************************************************************
   * PARA LOS DESCUENTOS
   ***************************************************************/
   createOffer() {
     this._product.insertOfferItem(this.collection, this.offer).subscribe(
       (response: any) => {
         this.refreshTable.emit(response);
         this.collection = null;
         this.offer = null;
         swal('Mensaje', 'Oferta agregada con éxito', 'success');
         this._product.modal = false;
       }
     );
   }
   /**************************************************************
   * FIN DESCUENTOS
   ***************************************************************/
   /**************************************************************
   * IMAGES
   ***************************************************************/
   insertImage(imageData: ProductImages) {
     this._product.addImageToProduct(imageData).subscribe(
       (resp: any) => {
         this.refreshTable.emit(resp);
         swal('Mensaje', 'Imagen agregada con éxito', 'success');
         this.imagePopup = false;
         console.log(resp);
       }
     );
   }
   /**************************************************************
   * END IMAGES
   ***************************************************************/

}
