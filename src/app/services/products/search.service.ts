import { Injectable } from '@angular/core';
import { SearchProducts } from '../../models/products/product-search.class';
import { ProductService } from './product.service';
import { ProductDescription } from '../../models/products/product-description.class';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  PRODUCTS: ProductDescription[] = [];
  constructor(private _product: ProductService, private route: Router) { }

  findProducts(objectSearch: SearchProducts) {
      this._product.findProducts(objectSearch, 'searchProduct').subscribe(
        (response: any) => {
          if ( response.status ) {
            this.PRODUCTS = response;
          } else {
            this.PRODUCTS = null;
            return;
          }
        }
      );
  }
}
