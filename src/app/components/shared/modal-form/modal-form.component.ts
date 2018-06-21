import { Component, OnInit } from '@angular/core';
import {  Validators, FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../../../services/products/product.service';
import { ModalService } from '../../../services/modal/modal.service';
import { ProductOffers } from '../../../models/products/product-discount.class';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent implements OnInit {
  form: FormGroup;
  constructor(public _product: ProductService, public _modal: ModalService) { }

  ngOnInit() {
    this.form = new FormGroup({
      price: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      date_start: new FormControl(null, [Validators.required]),
      date_end: new FormControl(null, [Validators.required]),
      product_id: new FormControl(this._product.navigationUrl, [Validators.required])
    });
  }
 createOffer() {
   const discountOffer = new ProductOffers(
     this.form.value.product_id,
     '2',
     this.form.value.quantity,
     this.form.value.price,
     this.form.value.date_start,
     this.form.value.date_end,
     null,
     null,
     '1'
   );
   this._modal.collection = this._product.collection;
   this._modal.offer = discountOffer;
   this._modal.createOffer();
   this.form.reset();
 }
 showModal() {
  this._product.modal = true;
 }
 hideModal() {
   this.form.reset();
  this._product.modal = false;
 }
}
