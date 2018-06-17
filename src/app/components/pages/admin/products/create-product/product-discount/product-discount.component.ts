import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../services/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductOffers } from '../../../../../../models/products/product-discount.class';
import { ModalService } from '../../../../../../services/modal/modal.service';

@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styles: []
})
export class ProductDiscountComponent implements OnInit {
  tableDiscounts: ProductOffers[] = [];
  constructor(private _product: ProductService,
  private _param: ActivatedRoute,
  private _modalService: ModalService) {
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
    this.loadTable();
    this._modalService.refreshTable.subscribe(
      (resp: any) => {
        this.tableDiscounts.push(resp.data);
      }
    );
  }
  showModal() {
    this._product.modal = true;
  }
  loadTable() {
    this._product.getDBById(this._product.navigationUrl, 'selectDiscount').subscribe(
      (response: any) => {
        for (const object of response) {
          this.tableDiscounts.push(object);
        }
      }
    );
  }

}
