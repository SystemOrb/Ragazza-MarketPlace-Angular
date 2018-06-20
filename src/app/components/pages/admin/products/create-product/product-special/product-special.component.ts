import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../services/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductOffers } from '../../../../../../models/products/product-discount.class';
import { ModalService } from '../../../../../../services/modal/modal.service';
declare const swal: any;
@Component({
  selector: 'app-product-special',
  templateUrl: './product-special.component.html',
  styles: []
})
export class ProductSpecialComponent implements OnInit {
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
        this._product.collection = 'insertSpecial';
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
  loadTable() {
    this._product.getDBById(this._product.navigationUrl, 'selectSpecial').subscribe(
      (response: any) => {
        for (const object of response) {
          this.tableDiscounts.push(object);
        }
      }
    );
  }
  showModal() {
    this._product.modal = true;
  }
  updateTable(table: ProductOffers) {
    const package_ = new ProductOffers(
      table.product_id,
      table.customer_group_id,
      table.quantity,
      table.price,
      table.date_start,
      table.date_end,
      table.product_special_id,
      null,
      table.priority
    );
    this._product.insertOfferItem('updateSpecial', package_).subscribe(
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
      text: '¿Estás seguro que deseas eliminar esta oferta?',
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
          tableItem.product_special_id,
          null,
          tableItem.priority
        );
        this._product.DeleteProductSpecial(package_ , 'deleteSpecial').subscribe(
          (response: any) => {
            console.log(response);
            this.tableDiscounts.splice(_key);
          }
        );
      }
    });
  }
}
