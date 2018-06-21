import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../../services/products/product.service';
import { ModalService } from '../../../../../../services/modal/modal.service';
import { ProductImages } from '../../../../../../models/products/product-images.class';
import { PHOTO_SERVICES } from '../../../../../../config/config';
import { AuthorService } from '../../../../../../services/products/author.service';
declare const swal: any;
@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {
  arrayImagenes: ProductImages[] = [];
  constructor(private _param: ActivatedRoute, private _product: ProductService,
  private _modal: ModalService, private _route: Router,
  private _guard: AuthorService) {
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

  ngOnInit() {
    this.loadTable();
    this._modal.refreshTable.subscribe(
      (resp: any) => {
        if (resp.data.operationType === 'update') { // Significa que fue una actualización
            // Actualiza la imagen vieja por la nueva a tiempo real
            const temporalImage = '/catalog/ropa/' + resp.path; // IMAGEN TEMPORAL
            const newObject: ProductImages[] = new Array(); // Creamos un array vacio
            newObject.push({
              'product_image_id': resp.data.product_image_id,
              'product_id': resp.data.product_id,
              'image': temporalImage,
              'sort_order': '0'
            });
            // this.arrayImagenes.splice(resp.data.index); // Removemos la imagen anterior
            this.arrayImagenes.splice(resp.data.index, 1);
            this.arrayImagenes.push(newObject[0]);  // Insertamos la imagen actualizada al arreglo
            this._modal.canUpdate = false;
            this._modal.imagePreview = '';
            this._modal.product_image_id = '';
        } else {
          this._modal.canUpdate = false;
          this._modal.imagePreview = '';
          this._modal.product_image_id = '';
        }
      }
    );
  }
  showModal() {
    this._modal.imagePopup = true;
  }
  loadTable() {
    this._product.getDBById(this._product.navigationUrl, 'selectImage').subscribe(
      (response: any) => {
        for (const object of response) {
          this.arrayImagenes.push(object);
        }
      }
    );
  }
  // Función que seteará las variables para actualizar la imagen
  getImageId(image: ProductImages, index: number) {
    this._modal.canUpdate = true;
    this._modal.product_image_id = image.product_image_id;
    this._modal.imagePreview = PHOTO_SERVICES + '/' + image.image;
    this._modal.indexImage = index;
    this._modal.operationType = 'update';
    this._modal.imagePopup = true;
  }
  deleteItem(image: ProductImages, index: number) {
    swal({
      title: 'Confirmación',
      text: '¿Estás seguro que deseas eliminar esta imagen?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willSend) => {
      if (willSend) {
        this.arrayImagenes.splice(index, 1);
        this._modal.deleteImage(image);
      }
    });
  }
}
