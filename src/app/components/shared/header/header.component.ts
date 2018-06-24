import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { PHOTO_SERVICES } from '../../../config/config';
import { SearchService } from '../../../services/products/search.service';
import { SearchProducts } from '../../../models/products/product-search.class';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  URL: string = PHOTO_SERVICES + '/';
  constructor(public _user: AuthService, private _search: SearchService,
  private route: Router) { }

  ngOnInit() {
  }

  logout() {
    this._user.logout();
  }
  searchProduct(query: string) {
    this.route.navigate(['/search', query]);
  }
}
