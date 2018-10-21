import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Todos los servicios de la aplicación
import { ProductService } from './products/product.service';
import { AuthService } from './auth/auth.service';
import { ModalService } from './modal/modal.service';
import { AuthorService } from './products/author.service';
import { SearchService } from './products/search.service';
// import { PlacetopayService } from './payment/placetopay.service';
import { PushService } from './notifications/push.service';
import { OrdersService } from './payment/orders.service';
import { WalletService } from './payment/wallet.service';
import { ShipService } from './payment/ship.service';
@NgModule({
  imports: [
    CommonModule,
     HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthService,
    ProductService,
    ModalService,
    AuthorService,
    SearchService,
    PushService,
    OrdersService,
    WalletService,
    ShipService
  ]
})
export class ServicesModule { }
