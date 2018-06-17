import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../../services/products/product.service';
import { ModalService } from '../../../../../../services/modal/modal.service';
import { ProductImages } from '../../../../../../models/products/product-images.class';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {
  arrayImagenes: ProductImages[] = [];
  constructor(private _param: ActivatedRoute, private _product: ProductService,
  private _modal: ModalService, private _route: Router) {
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
    this.loadTable();
    this._modal.refreshTable.subscribe(
      (resp: any) => {
       this.arrayImagenes.push(resp.data);
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
}
