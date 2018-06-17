import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styles: []
})
export class LinksComponent implements OnInit {


  constructor(public _product: ProductService) {

  }

  ngOnInit() {
  }

}
