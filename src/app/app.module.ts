// Modules from app
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './components/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/services.module';
// Routes
import { APP_ROUTES } from './app.routes';
import { VerifyLoginGuard } from './GUARDS/verify-login.guard';
import { ProductAuthorGuard } from './GUARDS/product-author.guard';
// Dependencies
import { AppComponent } from './app.component';
import { PagesComponent } from './components/pages/pages.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { CheckoutComponent } from './components/pages/payments/checkout/checkout.component';
import {CardModule} from 'ngx-card/ngx-card';
import { ConfirmComponent } from './components/pages/payments/checkout/confirm.component';
@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    NotFoundComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    APP_ROUTES,
    ServicesModule,
    CardModule
  ],
  providers: [
    VerifyLoginGuard,
    ProductAuthorGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
