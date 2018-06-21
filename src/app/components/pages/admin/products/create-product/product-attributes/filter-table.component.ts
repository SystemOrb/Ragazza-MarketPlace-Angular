import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAttributes } from '../../../../../../models/products/product-attr.class';
import { FilterType } from '../../../../../../models/filters/filters.class';
import { CategoryType } from '../../../../../../models/filters/categories.class';
import { AuthorService } from '../../../../../../services/products/author.service';
declare const swal: any;
@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styles: []
})
export class FilterTableComponent implements OnInit {
  ATTR_FILTER: ProductAttributes[] = [];
  ATTR_CATEGORY: ProductAttributes[] = [];
  FILTER: FilterType[] = [];
  CATEGORY: CategoryType[] = [];
  constructor(private _product: ProductService,
    private _param: ActivatedRoute, private _route: Router,
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
       this.getProductCategory();
       this.getProductFilter();
       this.getCategory();
       this.getFilter();
    }

    createNewChild() {
      this._route.navigate(['product-help', this._product.navigationUrl]);
    }
    getCategory() {
      this._product.getItemOpencart('categoryAll').subscribe(
        (fetchObject: any) => {
          for (const object of fetchObject) {
            this._product.getItemOpenCartWithId('categoryDescription',
          'category_id', object.category_id).subscribe(
            (category: any) => {
              for (const arrayCategory of category) {
                this.CATEGORY.push(arrayCategory);
              }
            }
          );
        }
      }
    );
  }
  getFilter() {
    this._product.getItemOpencart('filterAll').subscribe(
      (filters: any) => {
        this.FILTER = filters;
      }
    );
  }
  getProductFilter() {
    this._product.getDBById(this._product.navigationUrl, 'selectFilter').subscribe(
      (filterProduct: any) => {
        if (filterProduct.status !== false) {
        this.ATTR_FILTER = filterProduct;
        }
      }
    );
  }
  getProductCategory() {
    this._product.getDBById(this._product.navigationUrl, 'selectCategory').subscribe(
      (productCategory: any) => {
        if (productCategory.status !== false) {
          this.ATTR_CATEGORY = productCategory;
        }
      }
    );
  }
  updateFilter(output: ProductAttributes) {
    this._product.updatesOpencartItem(output, 'updateFilter').subscribe(
      (response: any) => {
        if (response.status) {
          swal('Filtro Actualizado con éxito');
        }
        console.log(response);
      }
    );
  }
}
