import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../services/products/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styles: []
})
export class ProductDiscountComponent implements OnInit {

  constructor(private _product: ProductService,
  private _param: ActivatedRoute) {
    this._param.params.subscribe( (response: any) => {
      if (response['id'] === 'nuevo') {
        this._product.navigationUrl = 'nuevo';
        this._product.navigation = false;
      } else {
        this._product.navigationUrl = response['id'];
        this._product.navigation = true;
        this._product.collection = 'insertDiscount';
      }
    });
  }

  ngOnInit() {
  }
  showModal() {
    this._product.modal = true;
  }

}
