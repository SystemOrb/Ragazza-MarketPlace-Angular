import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { PHOTO_SERVICES } from '../../../config/config';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  URL = PHOTO_SERVICES + '/';
  constructor(public _user: AuthService) { }

  ngOnInit() {
  }

}
