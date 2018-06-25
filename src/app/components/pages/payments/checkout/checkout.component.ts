import { Component, OnInit } from '@angular/core';
import { PlacetopayService } from '../../../../services/payment/placetopay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAddress } from '../../../../models/payment/address.class';
import { PayerUser } from '../../../../models/payment/payer.class';
import { Items } from '../../../../models/payment/items.class';
import { Request } from '../../../../models/payment/request.class';
import { Payment } from '../../../../models/payment/payment.class';
import { Amount } from '../../../../models/payment/amount.class';
import { NgForm } from '@angular/forms';
declare function init_plugins();
declare const swal: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  /********************************************* */
  // Construimos un objeto de tipo Request
  ID_CUSTOMER: string | number;
  ADDRESS: UserAddress[] = [] || null;
  items: Items[] = [];
  itemExtraInfo: Items;
  buyer: PayerUser;
  Request: Request;
  payment: Payment;
  amount: Amount;
  documentType: string;
  document: string;
  ip: string;
  userAgent: string = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36';
  returnUrl: string = 'http://ragazzashop.com/';
  cancelUrl: string = 'http://ragazzashop.com/';
  form: NgForm;
  /********************************************* */
  constructor(private _ptp: PlacetopayService,
  private _get: ActivatedRoute, private _route: Router) {
    this._get.params.subscribe(
      ((customer: any) => this.ID_CUSTOMER = customer['id'])
    );
    this._ptp.getIpClient().subscribe(
      (ip: any) => this.ip = ip.ip
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
        this.itemExtraInfo = cart[0];
         this.payment = new Payment(this.itemExtraInfo.reference,
          this.itemExtraInfo.description, this.amount, this.items,
          this.ADDRESS[0], false);
      }
    ).catch(
      (err: any) => {
        console.error(err);
        window.location.href = 'http://ragazzashop.com/';
      }
    );
    // SumCart
    this.sumCart(this.ID_CUSTOMER).then(
      (amount: any) => {
        const AmountItem: Amount = new Amount(
          null, null, 'USD', amount.total
        );
        this.amount = AmountItem;
      }
    ).catch(
      (err: any) => console.error(err)
    );
    /*
    Construimos un objeto de tipo Request
    */
  }
  sendForm(f: NgForm) {
    if (!f.valid) {
      swal('Alerta', 'Coloca tu número de documento para continuar', 'warning');
      return;
    }
    this.buyer.document = f.value.document;
    this.buyer.documentType = f.value.documentType;
    // Construimos el REQUEST para mandarlo al servidor
    setTimeout( () => {
      this.createRequest().then(
        (isSuccessful: any) => {
          this._ptp.createRequest(isSuccessful, this.ID_CUSTOMER)
          .subscribe(
            (request: any) => {
              console.log(request);
            }
          );
          console.log(isSuccessful);
        }
      ).catch(
        (failure: any) => console.error(failure)
      );
    }, 1000);
  }
  // Esto devolerá una promesa de tipo Request para el servidor
  createRequest(): Promise<Request | boolean> {
    return new Promise<Request | boolean>( (resolve, reject) => {
      // Constructores de clase
      // Empezamos con el Buyer y Payer del checkout
      const payer: PayerUser = new PayerUser(this.buyer.name,
      this.buyer.surname, this.buyer.email,
      this.buyer.documentType, this.buyer.document,
      this.buyer.mobile, this.ADDRESS[0]);
      // Creamos tambien el objeto buyer
      const buyer: PayerUser = new PayerUser(this.buyer.name,
        this.buyer.surname, this.buyer.email,
        this.buyer.documentType, this.buyer.document,
        this.buyer.mobile, this.ADDRESS[0]);
        // Ya tenemos el payment asi que creamos el Request
        const request: Request = new Request(
          'EC', payer, buyer, this.ADDRESS[0], this.payment, this.amount, null, this.ip,
          this.userAgent, this.returnUrl, this.cancelUrl, false,
          false, false, null);
          resolve(request);
    });
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
                'tax': '0',
                'reference': itemCart.cart_code,
                'description': description.data.name + '?id=' + itemData.data.product_id
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
 async sumCart(_keyCustomer: string | number): Promise<number | boolean> {
    return new Promise<number | boolean>( (resolve, reject) => {
      this._ptp.getCheckoutItems(_keyCustomer, 'sumCart', 'customer_id')
      .subscribe( (sum: any) => {
        if (!sum.status) {
          reject(false);
          return;
        }
        resolve(sum);
      });
    });
 }
}
