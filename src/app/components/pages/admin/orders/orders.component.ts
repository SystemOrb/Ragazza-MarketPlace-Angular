import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../services/payment/orders.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { PartialObserver } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  shopId: number | string;
  TableOrder: any[] = [];
  constructor(private _order: OrdersService, private _auth: AuthService,
    private _router: Router) {
    this.shopId = _auth.user_id;
   }

  async ngOnInit() {
    this.TableOrder = await this.getOrders();
  }
  getOrders(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._order.getShopData(this.shopId, 'OrderByShop').subscribe(
        (ShopOrders: PartialObserver<any> | any): void => {
          if (ShopOrders.status) {
            resolve(ShopOrders.data);
          } else {
            resolve(false);
          }
        }
      );
    });
  }
  goToInvoice(order_n: number | string) {
    this._router.navigate([`/invoice/${order_n}`]);
  }
}
