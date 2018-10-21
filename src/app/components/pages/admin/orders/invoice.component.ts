import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { OrdersService } from '../../../../services/payment/orders.service';
import { ActivatedRoute } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { ProductService } from '../../../../services/products/product.service';
import { ShippingObject } from '../../../../models/payment/shipping.class';
import { ShipService } from 'src/app/services/payment/ship.service';
import { NgForm } from '@angular/forms';
declare const swal: any;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: []
})
export class InvoiceComponent implements OnInit {
  idShop: number | string;
  invoicen: number | string;
  public objectInvoice: any = '';
  public productInfo: any = '';
  public tax: number = 0;
  public description: any = '';
  public shipMethods: ShippingObject[] | any = '';
  public shipping_status: number = 1;
  constructor(public _auth: AuthService, public _order: OrdersService,
    private _get: ActivatedRoute, private _product: ProductService,
    private _shipping: ShipService) {
      this._get.params.subscribe(
        (param: PartialObserver<any> | any): void => {
          this.invoicen = param['id'];
        }
      );
        this.idShop = this._auth.user_id;
   }

  async ngOnInit() {
    this.objectInvoice = await this.Invoice();
    this.productInfo = await this.ProductInfo();
    this.tax = Number(this.productInfo.price) + (Number(this.objectInvoice.commission));
    this.description = await this.ProductDescription();
    this.shipMethods = await this.GetAllShippingMethods();
    // console.log(this.productInfo);
    // console.log(this.description);
  }

  Invoice(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._order.getShopData(this.invoicen, 'findOrder').subscribe(
        (invoice: PartialObserver<any> | any): void => {
          resolve(invoice[0]);
        }
      );
    });
  }
  ProductInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._product.getDBById(this.objectInvoice.custom_field, 'selectData').subscribe(
        (productData: PartialObserver<any> | any): void => {
          resolve(productData[0]);
        }
      );
    });
  }
  ProductDescription(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._product.getDBById(this.objectInvoice.custom_field, 'selectDescription').subscribe(
        (productData: PartialObserver<any> | any): void => {
          resolve(productData[0]);
        }
      );
    });
  }
  GetAllShippingMethods(): Promise<ShippingObject[]> {
    return new Promise((resolve, reject) => {
      this._shipping.getAllShippingMethods('shipMethods').subscribe(
        (shipping: PartialObserver<any> | any): void => {
          if (shipping !== '') {
            resolve(shipping);
          }
        }
      );
    });
  }
  updateShipping(formShip: NgForm) {
    if (!formShip.valid) {
      return;
    }
    swal({
      title: 'Confirmación de cambio de pedido',
      text: '¿Estas seguro que deseas establecer este estatus para este pedido? Esta opción no se puede deshacer.',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    })
    .then((willSend) => {
      if (willSend) {
        const data = new FormData();
        data.append('firstname', formShip.value.firstname);
        data.append('product_name', formShip.value.product_name),
        data.append('comerce', formShip.value.comerce),
        data.append('comerce_fax', formShip.value.comerce_fax),
        data.append('comerce_mail', formShip.value.comerce_mail),
        data.append('comerce_status', formShip.value.comerce_status),
        data.append('customer_id', formShip.value.customer_id);
        this._shipping.updateShipInvoice('updateShipInvoice',
          this.invoicen,
          formShip.value.shipping_status,
          data
         ).subscribe(
          (updateShip: PartialObserver<any> | any): void => {
            if (updateShip.status) {
              swal('Estado del pedido actualizado',
               'Tu pedido ha sido actualizado con éxito, le notificaremos al cliente de tu nueva configuración',
               'success');
            }
          }
        );
      }
    });
  }
}
