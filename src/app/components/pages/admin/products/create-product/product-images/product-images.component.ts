import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../../../services/products/product.service';
import { ModalService } from '../../../../../../services/modal/modal.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {

  constructor(private _param: ActivatedRoute, private _product: ProductService,
  private _modal: ModalService) {
    this._param.params.subscribe( (response: any) => {
      if (response['id'] === 'nuevo') {
        this._product.navigationUrl = 'nuevo';
        this._product.navigation = false;
      } else {
        this._product.navigationUrl = response['id'];
        this._product.navigation = true;
      }
    });
  }

  ngOnInit() {
  }
  showModal() {
    this._modal.imagePopup = true;
  }

}
