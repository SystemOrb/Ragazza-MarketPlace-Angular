import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../../../../services/products/product.service';
import { ManufacturerType } from '../../../../../../models/filters/manufacturer.class';
import { CategoryType } from '../../../../../../models/filters/categories.class';
import { FilterGroup, FilterType } from '../../../../../../models/filters/filters.class';
import { ActivatedRoute, Router } from '@angular/router';
declare const swal: any;
@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styles: []
})
export class ProductAttributesComponent implements OnInit {
  /*
  Validamos el formulario de los atributos del producto
  */
  form: FormGroup;
  /************************************************** */
  /***********************SETTER************************** */
     MANUFACTURER: ManufacturerType[] = [];
     CATEGORY: CategoryType[] = [];
     SUBCATEGORY: CategoryType[] = [];
     FILTER_GROUP: FilterGroup[] = [];
     FILTER: FilterType[] = [];
  constructor(private _product: ProductService, private  _param: ActivatedRoute
  , private _route: Router) {
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
    this.form = new FormGroup({
      manufacturer: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      subcategory: new FormControl('', [Validators.required]),
      filter_group: new FormControl('', [Validators.required]),
      filter: new FormControl('', [Validators.required])
    });
    this.getManufacturer();
    this.getCategory();
    this.getFilterGroup();
  }
  sendForm() {
    if (!this.form.valid) {
      swal('Ops!', 'Debes completar el formulario para continuar', 'warning');
      return;
    }
    this._product.insertItemOpencart(this.form.value.category,
    this.form.value.filter, this.form.value.filter_group,
    this.form.value.manufacturer, this.form.value.subcategory,
    this._product.navigationUrl).subscribe(
      (resp: any) => {
        if (resp.status) {
          swal('Enhorabuena!', resp.message + ' Mientras mas datos agregues mas posicionamiento tendrá tu producto!', 'success');
          this._route.navigate(['/filters', this._product.navigationUrl]);
        }
      }
    );
  }
  getManufacturer() {
    this._product.getItemOpencart('manufacturer').subscribe(
      (fetchObject: any) => {
        this.MANUFACTURER = fetchObject;
      }
    );
  }
  /**
   * CÓDIGO SUPER IMPORTANTE RECORDAR
   * SE DEBE UTILIZAR PARA DEVOLVER UN ARRAY Y HACER UNA BUSQUEDA DENTRO DE OTRA DB
   * CON LA PROPIEDAD FOREACH RECORRE EL OBJETO
   */
  getCategory() {
    this._product.getItemOpencart('category').subscribe(
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
  /************************************************************************ */
  getSubcategories(category_id: string | number) {
    this.SUBCATEGORY = []; // Limpiamos para añadir nuevos objetos
     this._product.getItemOpenCartWithId('categoryById',
    'category_id', category_id).subscribe(
      (CATEGORY: any) => {
        for (const object of CATEGORY) {
          this._product.getItemOpenCartWithId('categoryDescription',
          'category_id', object.category_id).subscribe(
            (categoryData: any) => {
              for ( const arrayCategory of categoryData) {
                this.SUBCATEGORY.push(arrayCategory);
              }
            }
          );
        }
      }
    );
  }
  getFilterGroup() {
    this._product.getItemOpencart('filterGroup').subscribe(
      (filter: any) => {
        this.FILTER_GROUP = filter;
      }
    );
  }
  getFilter(filter_group: string | number) {
    this._product.getItemOpenCartWithId('filter', 'filter_group_id',
     filter_group).subscribe(
       (filterGroup: any) => {
         this.FILTER = filterGroup;
       }
     );
  }
  setForm() {
    // this._product.getDBById();
  }
  goParent() {
    this._route.navigate(['filters', this._product.navigationUrl]);
  }
}
