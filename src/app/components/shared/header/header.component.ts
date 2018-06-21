import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { PHOTO_SERVICES } from '../../../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  URL: string = PHOTO_SERVICES + '/';
  constructor(public _user: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this._user.logout();
  }

}
