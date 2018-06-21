import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../services/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductOffers } from '../../../../../../models/products/product-discount.class';
import { ModalService } from '../../../../../../services/modal/modal.service';
import { AuthorService } from '../../../../../../services/products/author.service';
declare const swal: any;
@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styles: []
})
export class ProductDiscountComponent implements OnInit {
  tableDiscounts: ProductOffers[] = [];
  constructor(private _product: ProductService,
  private _param: ActivatedRoute,
  private _modalService: ModalService,
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
  updateTable(table: ProductOffers) {
    const package_ = new ProductOffers(
      table.product_id,
      table.customer_group_id,
      table.quantity,
      table.price,
      table.date_start,
      table.date_end,
      null,
      table.product_discount_id,
      table.priority
    );
    this._product.insertOfferItem('updateDiscount', package_).subscribe(
      (updateOfer: any) => {
        if (updateOfer.status) {
          swal('Mensaje', 'Descuento ' + updateOfer.message, 'success' );
        } else {
          swal('Mensaje', 'Completa todos los campos para actualizar', 'warning' );
          return;
        }
      }
    );
  }
  deleteItem(tableItem: ProductOffers, _key: number) {
    swal({
      title: 'Confirmación',
      text: '¿Estás seguro que deseas eliminar este descuento?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willSend) => {
      if (willSend) {
        const package_ = new ProductOffers(
          tableItem.product_id,
          tableItem.customer_group_id,
          tableItem.quantity,
          tableItem.price,
          tableItem.date_start,
          tableItem.date_end,
          null,
          tableItem.product_discount_id,
          tableItem.priority
        );
        this._product.DeleteProductDiscount(package_ , 'deleteDiscount').subscribe(
          (response: any) => this.tableDiscounts.splice(_key)
        );
      }
    });
  }
}
