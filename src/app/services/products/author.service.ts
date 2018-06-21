import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  ID_GUARD: string | number;
  GUARD: boolean;
  canView: boolean;
  constructor(private _user: AuthService,
    private _product: ProductService) {}

    getProductAuthor() {
      this._product.getDBById(this.ID_GUARD, 'returnID').subscribe(
        (product: any) => {
          return product;
        }
      );
    }
    getLogin() {
      setTimeout( () => {
        console.log(this.getProductAuthor);
      }, 500 );
    }
}
