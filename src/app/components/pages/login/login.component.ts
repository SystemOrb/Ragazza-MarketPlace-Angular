import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserShop } from '../../../models/empresas.class';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  shop_email: string;
  shop_password: string;
  form: FormGroup;
  constructor(private _user: AuthService) {
      this.form = new FormGroup({
        shop_email: new FormControl(this.shop_email, [Validators.required, Validators.email]),
        shop_password: new FormControl(this.shop_password, [Validators.required])
      });
   }
  ngOnInit() {
  }
  authUser() {
    if (!this.form.valid) {
      return;
    }
    const newShop = new UserShop(this.shop_email, this.shop_password, '2');
    this._user.loginUser(newShop).subscribe();
  }
}
