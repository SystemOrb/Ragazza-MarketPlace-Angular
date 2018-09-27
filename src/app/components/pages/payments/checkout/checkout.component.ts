import { Component, OnInit } from '@angular/core';
import { KushiService } from '../../../../services/payment/kushi.service';
import { ActivatedRoute } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { CartItems } from '../../../../models/products/cart.class';
import { ProductData } from '../../../../models/products/product-data.class';
import { HTTP_SERVICE } from '../../../../config/config';
declare function init_plugins();
declare function init_kushki();
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit {
  idcustomer: number;
  cartItems: CartItems[] | any = '';
  sumCart: number;
  public URL: string = `${HTTP_SERVICE}/p2p/request.php`;
  constructor(private _kushki: KushiService, private _query: ActivatedRoute) {
    this._query.params.subscribe((param: PartialObserver<any> | any): void => {
      this.idcustomer = param['keyCustomer'];
    });
  }

  async ngOnInit() {
    init_plugins();
    this.cartItems = await this.getCartItems();
    const cartOperation = await this.getCartSum();
    this.sumCart = Number(cartOperation);
          setTimeout(async () => {
            init_kushki();
          }, 1000);
    console.log(this.cartItems);
  }
  getCartItems(): Promise <CartItems[] | boolean> {
    return new Promise((resolve, reject) => {
      this._kushki.getCarrito(this.idcustomer, 'cartItems').subscribe(
        async (cart: PartialObserver<any> | any) => {
          // Metemos la info del producto en el parametro product
          const arrayCartItems = new Array();
          // Por cada item en el carrito lo enlazamos con su info principal
          for (const items of cart.data) {
             const productData = await this.getCartData(Number(items.cart_product));
             const productDescription = await this.getCartDescription(Number(items.cart_product));
             // Seteamos la info
             items.cart_product = productData[0];
             items.option = productDescription[0];
            // Guardamos el nuevo array
            arrayCartItems.push(items);
          }
          // Devolvemos el array
          resolve(arrayCartItems);
        }
      );
    });
  }
  // Para obtener información del producto del carrito
  getCartData(keyProd: number): Promise<ProductData> {
    return new Promise((resolve, reject) => {
      this._kushki.getProductData(keyProd, 'selectData').subscribe(
        (prod: PartialObserver<any> | any): void => {
          resolve(prod);
        }
      );
    });
  }
  getCartDescription(keyProd: number): Promise<ProductData> {
    return new Promise((resolve, reject) => {
      this._kushki.getProductData(keyProd, 'selectDescription').subscribe(
        (prod: PartialObserver<any> | any): void => {
          resolve(prod);
        }
      );
    });
  }
  // Get Sum cart
  getCartSum(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._kushki.getCarrito(this.idcustomer, 'sumCart').subscribe(
        (prod: PartialObserver<any> | any): void => {
          if (prod.status) {
            resolve(prod.total);
          } else {
            throw new Error('No puede obtener la suma de los items');
          }
        }
      );
    });
  }
}
