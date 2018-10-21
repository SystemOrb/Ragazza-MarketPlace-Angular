import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public balance: number = 0;
  public sells: number = 0;
  constructor(private _http: HttpClient) { }

  getWalletData(shop_id: number | string, operationType?: string) {
    const url = `${HTTP_SERVICE}/orders.php?operationType=${operationType}&shop_id=${shop_id}`;
    return this._http.get(url).pipe(
      map( (response: any)  => {
        return response;
      }),
      catchError( (err: Observable<string | Boolean>) => {
        console.log('hola');
        return new Observable<string | boolean>();
      }),
    );
  }
}
