import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ROUTE
import { PagesRoutingModule } from './pages.routes';

// PAGES ADMIN COMPONENTS
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductTableComponent } from './admin/products/product-table/product-table.component';
import { ProductDataComponent } from './admin/products/create-product/product-data/product-data.component';
import { ProductDescriptionComponent } from './admin/products/create-product/product-description/product-description.component';
import { ProductAttributesComponent } from './admin/products/create-product/product-attributes/product-attributes.component';
import { ProductDiscountComponent } from './admin/products/create-product/product-discount/product-discount.component';
import { ProductSpecialComponent } from './admin/products/create-product/product-special/product-special.component';
import { ProductImagesComponent } from './admin/products/create-product/product-images/product-images.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SellersComponent } from './sellers/sellers.component';
import { BalanceComponent } from './balance/balance.component';
import { SharedModule } from '../shared/shared.module';
import { InvoiceComponent } from './admin/orders/invoice.component';
import { ImagesPipe } from '../../pipes/images.pipe';




@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    PagesRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
      LoginComponent,
      RegisterComponent,
      DashboardComponent,
      ProfileComponent,
      OrdersComponent,
      ProductTableComponent,
      ProductDataComponent,
      ProductDescriptionComponent,
      ProductAttributesComponent,
      ProductDiscountComponent,
      ProductSpecialComponent,
      ProductImagesComponent,
      NotFoundComponent,
      SellersComponent,
      BalanceComponent,
      InvoiceComponent,
      ImagesPipe
    ],
    providers: [
    ]
  })
export class PagesModule { }
