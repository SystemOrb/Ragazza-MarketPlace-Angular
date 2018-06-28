import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Push } from '../../models/push/push.class';
import { HTTP_SERVICE } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  refreshPush: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _http: HttpClient) {
  }
  /*************************************************
   * OBTENEMOS LAS NOTIFICACIONES
   *************************************************/
   getPush(ntf: Push, operationType: string) {
     let url = HTTP_SERVICE + '/notifications.php?operationType=' + operationType;
     url += '&emp_id=' + ntf.employ_id;
     return this._http.get(url).pipe(
      map( (response: any)  => {
        this.refreshPush.emit(response);
      }),
      catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
   }
   insertPush(ntf: Push, operationType: string) {
     const url = HTTP_SERVICE + '/notifications.php?operationType=' + operationType;
     const pushObject = new FormData();
     pushObject.append('employ_id', ntf.employ_id);
     pushObject.append('from_id', ntf.from_id);
     pushObject.append('message', ntf.message);
     return this._http.post(url, pushObject).pipe(
      map( (response: any)  => {
        this.refreshPush.emit(response);
      }),
      catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
   }
  /*************************************************
   * FIN  NOTIFICACIONES
   *************************************************/
}
