import { Component, OnInit } from '@angular/core';
import { PlacetopayService } from '../../../../services/payment/placetopay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAddress } from '../../../../models/payment/address.class';
import { PayerUser } from '../../../../models/payment/payer.class';
import { Items } from '../../../../models/payment/items.class';
declare function init_plugins();
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  ID_CUSTOMER: string | number;
  ADDRESS: UserAddress[] = [] || null;
  items: Items[] = [];
  buyer: PayerUser;
  constructor(private _ptp: PlacetopayService,
  private _get: ActivatedRoute, private _route: Router) {
    this._get.params.subscribe(
      ((customer: any) => this.ID_CUSTOMER = customer['id'])
    );
  }

  ngOnInit() {
    init_plugins();
    // Address Details
    this.getAddress().then(
      (address: any) => {
        this.ADDRESS = address;
        // console.log(this.ADDRESS);
      }
    ).catch(
      (err: any) => console.error(err)
    );
    // ClientDetails
    this.getCustomerInfo(this.ID_CUSTOMER).then(
      (buyer: any) => {
        this.buyer = buyer;
        // console.log(this.buyer);
      }
    ).catch(
      (err: any) => console.error(err)
    );
    // Items
    this.getCart().then(
      (cart: any) => {
        this.items = cart;
        // console.log(cart);
      }
    ).catch(
      (err: any) => {
        console.error(err);
        window.location.href = 'http://ragazzashop.com/';
      }
    );
  }
  /*
  Promesa que se encarga de verificar si existe un usuario con esa
  dirección, y además crea un Objeto de tipo Addres de PlaceToPay
  Carlos Estarita
  */
 getAddress(): Promise<UserAddress[] | boolean> {
  return new Promise( (resolve, reject) => {
    this._ptp.getClientAddress( this.ID_CUSTOMER, 'getAddress' ).subscribe(
      (addr: any) => {
        if (!addr.status) {
          reject(false);
          return;
        }
        const ADDRESS: UserAddress[] = new Array();
        for (const Addr of addr.data) {
          this.getCountry(Addr.country_id).then(
            (IsoCode: any) => {
              // Si esta promesa devuelve el país
              // Entonces buscamos la región
              this.getState(Addr.zone_id).then(
                (state: any) => {
                 // Construimos el arreglo que irá a PTP
                 ADDRESS.push({
                  'street' : Addr.address_1,
                  'city': Addr.city,
                  'state': state,
                  'postalcode': Addr.postcode,
                  'country': IsoCode,
                  'phone': null
                });
                resolve(ADDRESS);
                }
              ).catch(
                (err: any) => console.error(err)
              );
            }
          ).catch( (err: any) => console.error(err) );
        }
      }
    );
  });
 }
 /*
 Para obtener la región y el país
 */
 async getCountry(country_id): Promise<string | boolean> {
    return new Promise<string>( (resolve, reject) => {
      this._ptp.getCountry(country_id, 'getCountry').subscribe(
        (iso: any) => {
          if (iso.status) {
            resolve(iso.iso_code);
          } else {
            reject(false);
            return;
          }
        }
      );
    });
 }
 async getState(zone_id) {
  return new Promise<string>( (resolve, reject) => {
    this._ptp.getState(zone_id, 'getState').subscribe(
      (region: any) => {
        if (region.status) {
          resolve(region.name);
        } else {
          reject(false);
          return;
        }
      }
    );
  });
 }
 /*
 Función que retornará los datos del usuario
 Email, nombre, etc
 Para setearlos automaticamente
 */
  async getCustomerInfo(_key: string | number): Promise<PayerUser | boolean> {
    return new Promise<PayerUser | boolean>( (resolve, reject) => {
      this._ptp.getClientDetails(_key, 'getPayer').subscribe(
        (buyer: any) => {
          if (!buyer.status) {
            reject(false);
            return;
          }
          resolve(buyer);
        }
      );
    });
  }
  /*
  Funciones que construiran los items del checkout
  y verifica si tiene o no items, si no tiene lo
  redirecciona
  */
 async getCart(): Promise<Items[] | boolean> {
  return new Promise<Items[] | boolean>( (resolve, reject) => {
    this._ptp.getCheckoutItems(this.ID_CUSTOMER, 'cartItems', 'customer_id')
    .subscribe( (cartItems: any) => {
      if (!cartItems.status) {
        reject(false);
        return;
      }
     const items: Items[] = new Array();
     for (const itemCart of cartItems.data) {
      this.getItemData(itemCart.cart_product).then(
        (itemData: any) => {
          this.getItemDescription(itemData.data.product_id).then(
            (description: any) => {
              items.push({
                'sku': itemData.data.product_id,
                'name': description.data.name,
                'category': 'physical',
                'qty': itemData.data.quantity,
                'price': itemData.data.price,
                'tax': '0'
              });
              resolve(items);
            }
          ).catch( (err: any) => console.error(err) );
        }
      ).catch(
        (err: any) => console.log(err)
      );
     }
    });
  });
 }
 async getItemData(product_id: string | number): Promise<Items[] | boolean> {
  return new Promise<Items[] | boolean>( (resolve, reject) => {
    this._ptp.getCheckoutItems(product_id, 'cartData', 'product_id')
    .subscribe( (cartItems: any) => {
      resolve(cartItems);
    });
  });
 }
 async getItemDescription(product_id): Promise<Items[] | boolean> {
  return new Promise<Items[] | boolean>( (resolve, reject) => {
    this._ptp.getCheckoutItems(product_id, 'cartDescription', 'product_id')
    .subscribe( (cartItems: any) => {
      resolve(cartItems);
    });
  });
 }
}
