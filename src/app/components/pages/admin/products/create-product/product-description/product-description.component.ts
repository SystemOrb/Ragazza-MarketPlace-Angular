import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../services/products/product.service';
import { ProductDescription } from '../../../../../../models/products/product-description.class';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { AuthorService } from '../../../../../../services/products/author.service';
declare const swal: any;
@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.css']
})
export class ProductDescriptionComponent implements OnInit {
  constructor(private _product: ProductService, private _param: ActivatedRoute,
  private _user: AuthService, private _route: Router, private _guard: AuthorService) {
    this._param.params.subscribe( (response: any) => {
      if (response['id'] === 'nuevo') {
        this._product.navigationUrl = 'nuevo';
        this._guard.canView = true;
        this._product.navigation = false;
      } else {
        this._product.navigationUrl = response['id'];
        this._guard.ID_GUARD = response['id'];
        this._guard.canView = false;
        this._product.navigation = true;
      }
    });
  }
  descriptionData: ProductDescription;
  name: string;
  description: string;
  tag: string;
  meta_description: string = '' ;
  meta_keyword: string = '' ;
  meta_separadores: string = '';
  canUpdate: boolean = false;
  ngOnInit() {
    if (this._product.productDescription != null) {
      this.name = this._product.productDescription.name;
      this.description = this._product.productDescription.description;
      this.tag = this._product.productDescription.tag;
      this.meta_description = this._product.productDescription.meta_description;
      this.meta_keyword = this._product.productDescription.meta_keyword;
      this.meta_separadores = this._product.productDescription.meta_tags;
    } else {
      this.canUpdate = true;
      this.setForm();
    }
  }
  FormVerification(form: NgForm) {
    // Verificamos si es un formulario nuevo o va a actualizar
    if (!form.valid) {
      swal('Error', 'El formulario que has introducido es inválido', 'error');
      return;
    }
    this._param.params.subscribe( (GET: any) => {
      if (GET['id'] === 'nuevo') {
        // SETEAMOS ESTO PARA QUE SEA PERSISTENTE
        const object = new ProductDescription(
          null,
          '1',
          form.value.name,
          form.value.description,
          form.value.tag,
          this._user.user_id,
          form.value.meta_description,
          form.value.meta_keyword,
          form.value.meta_separadores
        );
        swal({
          title: 'Confirmación',
          text: '¿Estas seguro que quieres utilizar estos datos iniciales para tu producto?',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then((willSend) => {
          if (willSend) {
            this._product.productDescription = object;
            this._route.navigate(['/product-data', 'nuevo']);
          }
        });
      } else {
        // update
        if (this.canUpdate) {
          const object = new ProductDescription(
            this._product.navigationUrl,
            '2',
            form.value.name,
            form.value.description,
            form.value.tag,
            this._user.user_id,
            form.value.meta_description,
            form.value.meta_keyword,
            form.value.meta_separadores
          );
          this._product.CreateNewProductDescription(object, 'updateDescription').subscribe(
            (resp: any) => {
              if (resp.status) {
                swal('Mensaje', 'La descripción ha sido actualizada correctamente', 'success');
              }
            }
          );
        } else {
          return;
        }
      }
    });
  }
  setForm() {
    this._product.getDBById(this._product.navigationUrl, 'selectDescription').subscribe(
      (response: any) => {
        for (const object of response) {
          this.name = object.name;
          this.description = object.description;
          this.tag = object.tag;
          this.meta_description = object.meta_description;
          this.meta_keyword = object.meta_keyword;
          this.meta_separadores = object.meta_title;
        }
      }
    );
  }
}
