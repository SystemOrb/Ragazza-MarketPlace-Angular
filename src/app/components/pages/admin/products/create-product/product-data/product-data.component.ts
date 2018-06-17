import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { ProductService } from '../../../../../../services/products/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
/************************************************************************
 * MODELOS
 ************************************************************************/
import { ProductData } from '../../../../../../models/products/product-data.class';
import { LengthType } from '../../../../../../models/filters/length.class';
import { WeightType } from '../../../../../../models/filters/weight.class';
import { StatusType } from '../../../../../../models/filters/status.class';
import { StockType } from '../../../../../../models/filters/stock.class';
/************************************************************************
 * END MODELOS
 ************************************************************************/
declare const swal: any;
@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  profileImage: File;
  loading: boolean = false;
  /* Items Dinamicos*/
   length: LengthType[] = [];
   weight: WeightType[] = [];
   status: StatusType[] = [];
   stock: StockType[] = [];
  /*******************/
  constructor(private _product: ProductService, private _param: ActivatedRoute,
    private _user: AuthService, private _route: Router) {
      this._param.params.subscribe( (response: any) => {
        if (response['id'] === 'nuevo') {
          this._product.navigation = false;
        } else {
          this._product.navigation = true;
        }
      });
    }

  ngOnInit() {
    /*
    FORM ITEMS WITH DB
    */
    this.statusType();
    this.stockType();
    this.lengthType();
    this.weightType();
    /*
    FORM CONTROLS
    */
    this.form = new FormGroup({
      user_id: new FormControl(this._user.user_id, [Validators.required]),
      model: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      // stock: new FormControl(null, [Validators.required]),
      sku: new FormControl(''),
      upc: new FormControl(''),
      ean: new FormControl(''),
      jan: new FormControl(''),
      isbn: new FormControl(''),
      mpn: new FormControl(''),
      stock_status_id: new FormControl(''),
      image: new FormControl('', [Validators.required]),
      manufacturer_id: new FormControl(''),
      shipping: new FormControl(''),
      weight: new FormControl(''),
      weight_class_id: new FormControl(''),
      length: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
      length_class_id: new FormControl(''),
      minimum: new FormControl(''),
      status: new FormControl(''),
      viewed: new FormControl(''),
    });
    // console.log(this._product.productDescription);
  }
  createProduct() {
    if (!this.form.valid) {
      return;
    }
    if (this._product.productDescription !== null) {
      const sendPackage = new ProductData(
        this._user.user_id,
        this.form.value.model,
        this.form.value.price,
        this.form.value.quantity,
        this.form.value.sku,
        this.form.value.upc,
        this.form.value.ean,
        this.form.value.jan,
        this.form.value.isbn,
        this.form.value.mpn,
        this.form.value.stock_status_id,
        this.profileImage,
        null,
        null,
        this.form.value.weight,
        this.form.value.weight_class_id,
        this.form.value.length,
        this.form.value.width,
        this.form.value.height,
        this.form.value.length_class_id,
        this.form.value.minimum,
        this.form.value.status,
        null
      );
      swal({
        title: 'Confirmación',
        text: 'Por favor confirma que quieres publicar este producto',
        icon: 'info',
        buttons: true,
        dangerMode: false,
      })
      .then((willSend) => {
        if (willSend) {
          this.loading = true;
          this._product.createNewData(sendPackage, 'insert').subscribe(
            (response: any) => {
              if (response.status) {
                this._product.productDescription.product_id = response.data;
                this._product.CreateNewProductDescription(this._product.productDescription, 'insertDescription').subscribe();
                swal('Enhorabuena!', response.message, 'success');
                this._product.productDescription = null;
                this._product.productData = null;
                this.loading = false;
                this._route.navigate(['/product-info', response.data]);
              }
            }
          );
        }
      });
    } else {
      swal('Ops!', 'Hemos detectado que te faltan campos, revisa la pestaña anterior', 'warning');
    }
  }
  changePicture(file: File) {
    if (!file) {
      this.profileImage = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      swal('Alerta!', 'Debes insertar una imagen', 'warning');
      this.profileImage = null;
      return;
    }
    this.profileImage = file;
    const reader = new FileReader();
    const urlImagePreview = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagePreview = reader.result;
    };
  }
  stockType() {
    this._product.getItemOpencart('stock').subscribe(
      (fetchObject: any) => {
        this.stock = fetchObject;
      }
    );
  }
  statusType() {
    this._product.getItemOpencart('status').subscribe(
      (fetchObject: any) => {
        this.status = fetchObject;
      }
    );
  }
  lengthType() {
    this._product.getItemOpencart('length').subscribe(
      (fetchObject: any) => {
        this.length = fetchObject;
      }
    );
  }
  weightType() {
    this._product.getItemOpencart('weight').subscribe(
      (fetchObject: any) => {
        this.weight = fetchObject;
      }
    );
  }
}
