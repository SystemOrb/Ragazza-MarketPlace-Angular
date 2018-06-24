import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Todos los servicios de la aplicación
import { ProductService } from './products/product.service';
import { AuthService } from './auth/auth.service';
import { ModalService } from './modal/modal.service';
import { AuthorService } from './products/author.service';
import { SearchService } from './products/search.service';
import { PlacetopayService } from './payment/placetopay.service';
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
    PlacetopayService
  ]
})
export class ServicesModule { }
