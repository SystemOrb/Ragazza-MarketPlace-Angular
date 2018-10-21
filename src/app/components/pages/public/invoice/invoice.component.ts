import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../services/payment/orders.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/products/product.service';
import { PartialObserver } from 'rxjs';
declare function init_plugins();
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: []
})
export class InvoicePublicComponent implements OnInit {
  idShop: number | string;
  invoicen: number | string;
  public objectInvoice: any = '';
  public productInfo: any = '';
  public tax: number = 0;
  public description: any = '';
  public storeDetails: any = '';
  constructor(private _order: OrdersService,
    private _get: ActivatedRoute, private _product: ProductService) {
      this._get.params.subscribe(
        (param: PartialObserver<any> | any): void => {
          this.invoicen = param['invoiceId'];
          this.idShop = param['customer'];
        }
      );
    }

  async ngOnInit() {
    init_plugins();
    this.objectInvoice = await this.Invoice();
    console.log(this.objectInvoice);
    this.productInfo = await this.ProductInfo();
    this.tax = Number(this.productInfo.price) + (Number(this.objectInvoice.commission));
    this.description = await this.ProductDescription();
    this.storeDetails = await this.shopDetails();
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
  shopDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._order.getShopData(this.objectInvoice.store_id, 'shopDetails').subscribe(
        (productData: PartialObserver<any> | any): void => {
          resolve(productData[0]);
        }
      );
    });
  }
}
