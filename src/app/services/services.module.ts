import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Todos los servicios de la aplicación
import { ProductService } from './products/product.service';
import { AuthService } from './auth/auth.service';
@NgModule({
  imports: [
    CommonModule,
     HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthService,
    ProductService
  ]
})
export class ServicesModule { }
