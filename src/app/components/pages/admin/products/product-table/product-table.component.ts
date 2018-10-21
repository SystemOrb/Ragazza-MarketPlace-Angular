import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../services/products/product.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ProductsTable } from '../../../../../models/products/product-table.class';
import { PHOTO_SERVICES } from '../../../../../config/config';
import { ProductData } from '../../../../../models/products/product-data.class';
import { Router } from '@angular/router';
import { WalletService } from '../../../../../services/payment/wallet.service';
declare const swal: any;
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styles: []
})
export class ProductTableComponent implements OnInit {
  TABLE: ProductsTable[] = [];
  imagesUrl = PHOTO_SERVICES + '/';
  itemsPosted: number = 0;
  itemsSells: number = 0;
  constructor(private _product: ProductService,
     private _user: AuthService, private _route: Router,
     public _wallet: WalletService) { }

  ngOnInit() {
    // this.getAllProducts();
    this.getAllProduct().then(
      (TablePromise: any) => {
        this.TABLE = TablePromise;
      }
    ).catch(
      (errInPromise: any) => {
        return;
      }
    );
    // CONTADORES
    this.getQtyItems();
    this.getSells();
  }
  /*
  Función IMPORTANTISIMA
  ESTO ES UNA PROMESA QUE CREA UN OBJETO Y UNIFICA DOS BUCLES CON PETICIONES SELECT
  EN UN SOLO ARREGLO
  */
  getAllProduct(): Promise<ProductsTable[]> {
    return new Promise( (resolve, reject) => {
      this._product.getByUSER(this._user.user_id, 'selectProductTable').subscribe(
        (resp: any) => {
          if ( resp.status ) {
            const TABLE: ProductsTable[] = new Array();
            for (const objectData of resp.data) {
              this._product.getDBById(objectData.product_id, 'selectDescription').subscribe(
                (name: any) => {
                  for (const description of name) {
                    TABLE.push({
                      'user_id': objectData.user_id,
                      'product_id': objectData.product_id,
                      'image': objectData.image,
                      'model': objectData.model,
                      'price': objectData.price,
                      'quantity': objectData.quantity,
                      'status': objectData.status,
                      'name':  description
                    });
                    resolve(TABLE);
                  }
                }
              );
          }
          } else {
            reject(false);
          }
        }
      );
    });
  }
  deleteItem(product: ProductsTable, index: number) {
    swal({
      title: 'Confirmación',
      text: '¿Estás seguro que deseas eliminar este descuento?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willSend) => {
      if (willSend) {
        const package_ = new ProductData(null, null , null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, product.product_id);
        this._product.DeleteProduct(package_, 'deleteProduct').subscribe(
          (removed: any) => {
            if (removed.status) {
              this.TABLE.splice(index, 1);
              this.itemsPosted = (this.itemsPosted - 1);
            }
          }
        );
      }
    });
  }
  editItem(URL_ID: ProductsTable) {
    this._route.navigate(['product-info', URL_ID.product_id]);
  }
  getQtyItems() {
    this._product.getCountItems(this._user.user_id, 'countItems')
    .subscribe(
      (flag: any) => this.itemsPosted = flag.total
    );
  }
  getSells() {
    this._product.getCountItems(this._user.user_id, 'countSell')
    .subscribe(
      (flag: any) => this.itemsSells = flag.total
    );
  }
}
