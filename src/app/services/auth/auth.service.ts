/*
Servicio que se encarga de mantener la autenticación en ragazazShop Empresas
Carlos Estarita
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';
import { UserShop } from '../../models/empresas.class';
import { HTTP_SERVICE } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string;
  userShop: UserShop;
  user_id: string;
  constructor(private _http: HttpClient, private route: Router) {
  }
  /******************************************************************************
   * INICIO DE SESIÓN
  *******************************************************************************/
  loginUser(userEmployer: UserShop) {
    const url = HTTP_SERVICE + '/login.php?operationType=login';
    /*
    Si es backend con PHP, debemos hacerlo con FORMDATA
    */
    const object = new FormData();
    object.append('shop_email', userEmployer.shop_email);
    object.append('shop_password', userEmployer.shop_password);
      return this._http.post(url, object).pipe(
        map( (response: any) => {
           if (response.status === 'email_wrong' || response.status === 'pwd_wrong') {
            swal('Ops!', 'Los datos que has introducido son incorrectos, inténtalo nuevamente', 'error');
          }
          this.saveStorage(response.email, response.customer_type,
          response.address, response.id, response.phone, response.realname);
          this.route.navigate(['/profile']);
        }),
        catchError( (err: any)  => {
          console.error(err);
          return new Observable<string | boolean>();
        })
      );
  }
  saveStorage(shop_email: string, shopCustomerType: string,
     shop_address: string,
     shop_id: string,
     shop_phone: string, shop_name: string) {
      const shopStorage = new UserShop(shop_email, null, shop_id,
        shop_name, shopCustomerType, shop_address, shop_phone, null);
        localStorage.setItem('shopData', JSON.stringify(shopStorage));
        localStorage.setItem('user_id', shop_id);
        localStorage.setItem('email' , shop_email);
        this.email = shop_email;
        this.user_id = shop_id;
        this.userShop = shopStorage;
  }
  loadStorage() {
    this.email = localStorage.getItem('email') || '';
    this.userShop = JSON.parse(localStorage.getItem('shopData')) || '';
    this.user_id = localStorage.getItem('user_id') || '';
  }
  logged(): boolean {
    if (this.user_id === '' || this.user_id === undefined || this.user_id === null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    localStorage.removeItem('shopData');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    this.email = '';
    this.userShop = null;
    this.user_id = '';
    this.route.navigate(['/login']);
  }
    /******************************************************************************
   * FIN INICIO DE SESIÓN
  *******************************************************************************/
   /******************************************************************************
   * REGISTRO DE EMPRESA
  *******************************************************************************/
 registerNewUser(userEmployer: UserShop) {
    const object = new FormData();
    object.append('customer_group_id', userEmployer.customer_group_id);
    object.append('shop_name', userEmployer.shop_name);
    object.append('shop_address', userEmployer.shop_address);
    object.append('shop_email', userEmployer.shop_email);
    object.append('shop_phone', userEmployer.shop_phone);
    object.append('shop_password', userEmployer.shop_password);
  const url = HTTP_SERVICE + '/login.php?operationType=register';
  return this._http.post(url, object).pipe(
    map( (response: any) => {
      console.log(response);
    }),
    catchError( (err: any)  => {
      console.error(err);
      return new Observable<string | boolean>();
    })
  );
 }
}
