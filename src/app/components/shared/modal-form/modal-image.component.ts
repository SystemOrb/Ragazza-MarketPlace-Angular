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
  constructor(private _product: ProductService, private _modal: ModalService) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      product_id: new FormControl(this._product.navigationUrl, [Validators.required])
    });
  }
 sendForm() {
   if (!this.form.valid) {
     return;
   }
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
