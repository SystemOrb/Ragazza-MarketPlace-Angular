import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP_SERVICE, KUSHKI_SERVICE_SANDBOX, PUBLIC_MERCHANT_ID, PRIVATE_MERCHANT_ID } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { KushkiToken } from '../../models/payment/token.class';
import { KushkiCharge } from '../../models/payment/payload.class';

@Injectable({
  providedIn: 'root'
})
export class KushiService {

  constructor(private _http: HttpClient) { }

  getCarrito(customerId: number, operationType?: string, search?: string ) {
    const url = `${HTTP_SERVICE}/checkoutItems.php?operationType=${operationType}&customer_id=${customerId}`;
    return this._http.get(url).pipe(
      map( (response: any)  => {
        return response;
      }),
      catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
  }
  getProductData(keyProd: number, operationType: string, search?: string) {
    let url = `${HTTP_SERVICE}/products.php?operationType`;
    url += `=${operationType}&product_id=${keyProd}`;
    return this._http.get(url).pipe(
      map( (response: any)  => {
        return response;
      }),
      catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
  }
  // Payment REST
  // Generamos el token
  PaymentRequest(payload: KushkiToken) {
    const url = `${KUSHKI_SERVICE_SANDBOX}tokens`;
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Public-Merchant-Id': PUBLIC_MERCHANT_ID
    });
    return this._http.post(url, JSON.stringify(payload), headers).pipe(
      map( (response: any)  => {
        return response;
      }),
      catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
  }
  // Enviamos el pago
  PaymentSend(paymentConfirm: KushkiCharge) {
    const url = `${KUSHKI_SERVICE_SANDBOX}charges`;
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Private-Merchant-Id': PRIVATE_MERCHANT_ID
    });
    return this._http.post(url, JSON.stringify(paymentConfirm), headers).pipe(
      map( (response: any)  => {
        return response;
      }),
      catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
  }
}
