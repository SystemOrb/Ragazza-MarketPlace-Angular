import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserShop } from '../../../models/empresas.class';
import { NgForm } from '@angular/forms';
declare const swal: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  /*
  Forms
  */
  profile: UserShop;
  shop_name: string;
  shop_address: string;
  shop_phone: string;
  user_id: string;
  /*
  IMAGES
  */
   profileImage: File;
   imagePreview: string;
   /*
   PACKAGE
   */
  objectSend: UserShop;
  buttonSend = false;
  constructor(private _user: AuthService) {
   }

  ngOnInit() {
    this.profile = this._user.userShop;
    this.shop_name = this.profile.shop_name;
    this.shop_address = this.profile.shop_address;
    this.shop_phone = this.profile.shop_phone;
    this.user_id = this.profile.shop_id;
  }
  updateProfile(form: NgForm) {
    const updateProfile = new UserShop(null,
    null, form.value.user_id, form.value.shop_name, null,
    form.value.shop_address, form.value.shop_phone);
    this._user.updateShopProfile(updateProfile).subscribe();
  }
  profileChanged(file: File) {
    if (!file) {
      this.profileImage = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      swal('Alerta!', 'Debes insertar una imagen', 'warning');
      this.profileImage = null;
      return;
    }
    this.profileImage = file;
    const reader = new FileReader();
    const urlImagePreview = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagePreview = reader.result;
      this.buttonSend = true;
    };
    /*
    SERIALIZAMOS
    */
    this.objectSend = new UserShop(
      this._user.userShop.shop_email, null, this._user.user_id,
      this.shop_name, this._user.userShop.customer_group_id,
      this.shop_address, this.shop_phone, this.profileImage,
      null);
  }
   sendObjectToBackend() {
    swal({
      title: 'Confirmación',
      text: '¿Estás seguro que deseas cambiar tu imagen de perfil?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willSend) => {
      if (willSend) {
        this._user.updateShopProfileWithPhoto(this.objectSend).subscribe();
        /*swal('Tu imagen de perfil ha sido actualizada', {
          icon: 'success',
        });*/
      } else {
        this.buttonSend = false;
      }
    });
   }
}
