import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
// Todos los servicios de la aplicación
import { HttpModule } from '@angular/http';
@NgModule({
  imports: [
    CommonModule,
    // HttpModule
     HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthService
  ]
})
export class ServicesModule { }
