import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public country: string = '';
  public region: string = '';
  constructor(private _http: HttpClient) { }

  // Shop Orders
  getShopData(shop_id: number | string, operationType?: string) {
    const url = `${HTTP_SERVICE}/orders.php?operationType=${operationType}&shop_id=${shop_id}`;
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
  getPipeCountryOrRegion(operationType: string, searchReference: string, key: number) {
    const url = `${HTTP_SERVICE}/address.php?operationType=${operationType}&${searchReference}=${key}`;
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
}
