import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// Modules from app
import { SharedModule } from './components/shared/shared.module';
import { PagesModule } from './components/pages/pages.module';
import { PagesComponent } from './components/pages/pages.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTES } from './app.routes';
import { ServicesModule } from './services/services.module';
import { VerifyLoginGuard } from './GUARDS/verify-login.guard';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    PagesModule,
    HttpClientModule,
    APP_ROUTES,
    ServicesModule
  ],
  providers: [
    VerifyLoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
