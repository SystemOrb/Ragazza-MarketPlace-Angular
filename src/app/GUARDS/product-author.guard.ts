import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/products/product.service';
import { AuthorService } from '../services/products/author.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductAuthorGuard implements CanActivate {
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.verifiItem().then(
      (boolean: boolean) => {
        return boolean;
      }).catch(
        (boolean: boolean) => {
          this._Route.navigate(['/products']);
          return boolean;
        }
      );
     return true;
  }
  constructor(private _user: AuthService,
     private _product: ProductService,
     private _guard: AuthorService,
     private _Route: Router) {
  }
  verifiItem(): Promise<boolean> { // Retorna una promesa booleana
    // Promesa que se encarga de verificar si el id es el mismo que el usuario
    // sino lo saca
    return new Promise( (resolve, reject) => {
      setTimeout( () => { // Para verificar si es un producto nuevo
        if (this._guard.canView) {
          resolve(true);
          return;
        } // Sino significa que tiene ID y verificamos
         this._product.getDBById(this._guard.ID_GUARD, 'returnID').subscribe(
           (resp: any) => {
              if (this._user.user_id === resp) {
                resolve(true);
              } else {
                reject(false);
              }
           }
         );
      }, 1000);
   });
  }
}
