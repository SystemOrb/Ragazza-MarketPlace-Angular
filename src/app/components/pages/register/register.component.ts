import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserShop } from '../../../models/empresas.class';
import { AuthService } from '../../../services/auth/auth.service';
declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  /*
  Variables de formulario
  */
  shop_name: string;
  shop_address: string;
  customer_group_id: string;
  shop_email: string;
  shop_password: string;
  shop_password2: string;
  shop_phone: string;
  conditions: boolean;
  /***************************/

  constructor(private _user: AuthService) {
    this.form = new FormGroup({
      shop_name: new FormControl(this.shop_name, [Validators.required]),
      shop_address: new FormControl(this.shop_address),
      shop_email: new FormControl(this.shop_email, [Validators.required, Validators.email]),
      shop_password: new FormControl(this.shop_password, [Validators.required, Validators.minLength(5)]),
      shop_password2: new FormControl(this.shop_password2, [Validators.required]),
      shop_phone: new FormControl(this.shop_phone),
      conditions: new FormControl(true, [Validators.required]),
      customer_group_id: new FormControl('2')
    }, {validators: this.verifyPassword('shop_password', 'shop_password2')});
  }
    verifyPassword(pwd1: string, pwd2: string): any {
      return (group: FormGroup) => {
        if (group.controls[pwd1].value === group.controls[pwd2].value ) {
          return null;
        }
        return {
          passwordMatch: true
        };
      };
    }
  ngOnInit() {
    init_plugins();
  }
  registerNewShop() {

    if (!this.form.valid) {
      return;
    }
    /*Creamos la nueva empresa */
    const newUserShop = new UserShop(
      this.form.controls['shop_email'].value,
      this.form.controls['shop_password'].value,
      null,
      this.form.controls['shop_name'].value,
      this.form.controls['customer_group_id'].value,
      this.form.controls['shop_address'].value,
      this.form.controls['shop_phone'].value
    );
    this._user.registerNewUser(newUserShop).subscribe(
      (authData: any) => {
        if (authData.status) {
          // Iniciamos sesión
          setTimeout( ()  => {
            this._user.loginUser(new UserShop(
               authData.data.shop_email,
               authData.data.shop_password)).subscribe();
          }, 500);
        }
      }
    );
  }

}
