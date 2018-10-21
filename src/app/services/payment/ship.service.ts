import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from 'src/app/config/config';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  constructor(private _http: HttpClient) { }

  // Al Ship methods
  getAllShippingMethods(operationType: string) {
    const url = `${HTTP_SERVICE}/ship.php?operationType=${operationType}`;
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
  updateShipInvoice(operationType: string, order_id: number | string, order_status: number, data: any) {
    let url = `${HTTP_SERVICE}/ship.php?operationType=${operationType}`;
    url += `&order_id=${order_id}&order_status=${order_status}`;
    return this._http.post(url, data).pipe(
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
