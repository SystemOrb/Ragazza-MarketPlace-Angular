import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// Modules from app
import { SharedModule } from './components/shared/shared.module';
import { PagesModule } from './components/pages/pages.module';
import { PagesComponent } from './components/pages/pages.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { ServicesModule } from './services/services.module';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
