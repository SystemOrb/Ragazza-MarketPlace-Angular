import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HTTP_SERVICE } from '../../config/config';
import { Observable } from 'rxjs/internal/Observable';

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
}
