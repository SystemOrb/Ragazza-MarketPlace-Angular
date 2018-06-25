import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HTTP_SERVICE } from '../../config/config';
import { Observable } from 'rxjs/internal/Observable';
import { Request } from '../../models/payment/request.class';

@Injectable({
  providedIn: 'root'
})
export class PlacetopayService {

  constructor(private _http: HttpClient) {
   }
   /*********************************************
   OBTENER DIRECCIÓN DE ENVÍO
   **********************************************/
     getClientAddress(_key: string | number, operationType: string) {
        let url = HTTP_SERVICE + '/address.php?operationType=' + operationType;
        url += '&customer_id=' + _key;
        return this._http.get(url).pipe(
          map( (addr: any) => {
            return addr;
          }),
          catchError( (err: Observable<string | Boolean>) => {
            console.log(err);
            return new Observable<string | boolean>();
          }),
        );
     }
     getCountry(_key: string | number, operationType: string) {
      let url = HTTP_SERVICE + '/address.php?operationType=' + operationType;
      url += '&country_id=' + _key;
      return this._http.get(url).pipe(
        map( (addr: any) => {
          return addr;
        }),
        catchError( (err: Observable<string | Boolean>) => {
          console.log(err);
          return new Observable<string | boolean>();
        }),
      );
     }
     getState(_key: string | number, operationType: string) {
      let url = HTTP_SERVICE + '/address.php?operationType=' + operationType;
      url += '&zone_id=' + _key;
      return this._http.get(url).pipe(
        map( (addr: any) => {
          return addr;
        }),
        catchError( (err: Observable<string | Boolean>) => {
          console.log(err);
          return new Observable<string | boolean>();
        }),
      );
     }
  /*********************************************
   FIN OBTENER DIRECCIÓN DE ENVÍO
   **********************************************/
    /*********************************************
    OBTENER INFORMACIÓN DEL BUYER/PAYER
   **********************************************/
  getClientDetails(_key: string | number, operationType: string) {
    let url = HTTP_SERVICE + '/address.php?operationType=' + operationType;
    url += '&customer_id=' + _key;
    return this._http.get(url).pipe(
      map( (addr: any) => {
        return addr;
      }),
      catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
 }
   /*********************************************
   FIN OBTENER DIRECCIÓN DE ENVÍO
   **********************************************/
   /*********************************************
   OBTENER ITEMS = items[]
   **********************************************/
    getCheckoutItems(_key: string | number, operationType: string,
    search: string) {
      let url = HTTP_SERVICE + '/checkoutItems.php?operationType=' + operationType;
      url += '&' + search + '=' + _key;
      return this._http.get(url).pipe(
        map( (items: any) => {
          return items;
        }),
        catchError( (err: Observable<string | Boolean>) => {
          console.log(err);
          return new Observable<string | boolean>();
        }),
      );
    }
  /*********************************************
   FIN OBTENER ITEMS = items[]
   **********************************************/
  /*********************************************
   IP DEL USUARIO
   **********************************************/
    getIpClient() {
      const url = 'http://api.ipify.org/?format=json';
      return this._http.get(url).pipe(
        map( (ip: any) => {
          return ip;
        }),
        catchError( (err: Observable<string | Boolean>) => {
          console.log(err);
          return new Observable<string | boolean>();
        }),
      );
    }
   /*********************************************
   FIN OBTENER IP
   **********************************************/
  /*********************************************
   SEND REQUEST
   **********************************************/
  createRequest(_request: Request, _customer: string | number) {
    const request = new FormData();
    /*
    Objeto de tipo Buyer & Payer
    */
    request.append('name', _request.payer.name);
    request.append('surname', _request.payer.surname);
    request.append('email', _request.payer.email);
    request.append('documentType', _request.payer.documentType);
    request.append('document', _request.payer.document);
    request.append('mobile', _request.payer.mobile);
    request.append('address', JSON.stringify(_request.payer.address));
    /*
    Dirección & Shipping
    */
   request.append('street', _request.shipping.street);
   request.append('city', _request.shipping.city);
   request.append('state', _request.shipping.state);
   request.append('postalcode', _request.shipping.postalcode);
   request.append('country', _request.shipping.country);
   request.append('phone', _request.shipping.phone);
    /*
    Items
    */
   request.append('reference', _request.payment.reference);
   request.append('description', _request.payment.description);
   request.append('amount', JSON.stringify(_request.payment.amount));
   request.append('items', JSON.stringify(_request.payment.items));
   request.append('shipping', JSON.stringify(_request.payment.shipping));
   request.append('allowPartial', _request.payment.allowPartial);
   /*
   Amount
   */
   request.append('currency', _request.amount.currency);
   request.append('details', _request.amount.details);
   request.append('taxes', _request.amount.taxes);
   request.append('total', _request.amount.total);
   /*
   Fields
   */
    request.append('locale', _request.locale);
    request.append('expiration', _request.expiration);
    request.append('ipAddress', _request.ipAddress);
    request.append('userAgent', _request.userAgent);
    request.append('returnUrl', _request.returnUrl);
    request.append('cancelUrl', _request.cancelUrl);
    request.append('skipResult', _request.skipResult);
    request.append('noBuyerFill', _request.noBuyerFill);
    request.append('captureAddress', _request.captureAddress);
    request.append('paymentMethod', _request.paymentMethod);
    /*
    Send All package
    */
    const url = HTTP_SERVICE + '/p2p/request.php?customer=' + _customer;
    return this._http.post(url, request).pipe(
      map( (isSuccessfull: any) => {
        return isSuccessfull;
      }),
      catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
  }
}
