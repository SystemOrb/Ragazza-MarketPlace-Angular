import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyLoginGuard implements CanActivate {
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
     if (this.userLogged.logged()) {
       return true;
     } else {
      this.route.navigate(['/login']);
      return false;
     }
  }
  constructor(private userLogged: AuthService, private route: Router) {
  }
}
