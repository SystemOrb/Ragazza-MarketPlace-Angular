import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/products/product.service';
import { ModalService } from '../../../services/modal/modal.service';
import { ProductImages } from '../../../models/products/product-images.class';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {
  form: FormGroup;
  Image: File;
  ImagePreview: string;
  loading: boolean = false;
  constructor(private _product: ProductService, public _modal: ModalService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      product_id: new FormControl(this._product.navigationUrl, [Validators.required]),
      product_image_id: new FormControl(this._modal.product_image_id),
      index: new FormControl(this._modal.indexImage),
      operationType: new FormControl(this._modal.operationType)
    });
  }
 sendForm() {
   if (!this.form.valid) {
     return;
   }
   if (this._modal.canUpdate) { // update
      this.loading = true;
      this.form.value.product_image_id = this._modal.product_image_id;
      this.form.value.index = this._modal.indexImage;
      this.form.value.operationType = this._modal.operationType;
      const objectImage_ = new ProductImages(
        this.form.value.product_id,
        this.Image,
        this.form.value.product_image_id,
        null,
        this.form.value.index,
        this.form.value.operationType
      );
      this._modal.updateImage(objectImage_);
      this.loading = false;
   } else {
     // iNSERT
    this.loading = true;
    const objectImage = new ProductImages(
      this.form.value.product_id,
      this.Image
    );
    this._modal.insertImage(objectImage);
    this._product.modal = false;
    this.ImagePreview = null;
    this.form.value.image = '';
    this.loading = false;
   }
 }
 closeModal() {
   this._modal.imagePopup = false;
   this.ImagePreview = null;
   this.form.value.image = '';
 }
 profileChanged(file: File) {
  if (!file) {
    this.Image = null;
    return;
  }
  if (file.type.indexOf('image') < 0) {
    swal('Alerta!', 'Debes insertar una imagen', 'warning');
    this.Image = null;
    return;
  }
  this.Image = file;
  const reader = new FileReader();
  const urlImagePreview = reader.readAsDataURL(file);
  reader.onloadend = () => {
    this.ImagePreview = reader.result;
  };
 }
}
