import { Component, OnInit } from '@angular/core';
import { PushService } from '../../../services/notifications/push.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Push } from '../../../models/push/push.class';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styles: []
})
export class PushComponent implements OnInit {
  Notifications: Push[] = [];
  constructor(private _ntf: PushService, private _auth: AuthService) { }

  ngOnInit() {
    // Obtenemos la lista de notificaciones
    this._ntf.getPush(new Push(this._auth.user_id), 'getPush').subscribe();
    // Ahora recorremos esas notificaciones
    this._ntf.refreshPush.subscribe(
      (ntf: any) => {
        if (!ntf.status) {
          return;
        }
        this.Notifications = ntf.data;
      }
    );
  }

}
