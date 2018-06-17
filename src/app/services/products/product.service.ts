/*
Servicio que se encargará de cargar data de los artículos
*/
import { Injectable } from '@angular/core';
import { ProductData } from '../../models/products/product-data.class';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductDescription } from '../../models/products/product-description.class';
import { ProductAttributes } from '../../models/products/product-attr.class';
import { ProductOffers } from '../../models/products/product-discount.class';
import { ProductImages } from '../../models/products/product-images.class';
import { CategoryType } from '../../models/filters/categories.class';
import { FilterType } from '../../models/filters/filters.class';
import { ManufacturerType } from '../../models/filters/manufacturer.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public navigationUrl: string | number;
  public navigation: Boolean; // Si es nuevo, se oculta si un update ,aparece
  /**
   *
   * Temporals
   */
   public productDescription: ProductDescription = null;
   public productData: ProductData = null;
   /*
    END TEMPORAL
   */
  constructor(private _http: HttpClient) { }
  /**********************************************************
   * CREATE & UPDATE NEW PRODUCT
   **********************************************************/
  createNewData(_productData: ProductData, operationType: string) {
    const formProductData = new FormData();
    formProductData.append('user_id', _productData.user_id);
    formProductData.append('product_id', _productData.product_id);
    formProductData.append('model', _productData.model);
    formProductData.append('price', _productData.price);
    formProductData.append('quantity', _productData.quantity);
    formProductData.append('sku', _productData.sku);
    formProductData.append('upc', _productData.upc);
    formProductData.append('ean', _productData.ean);
    formProductData.append('jan', _productData.jan);
    formProductData.append('isbn', _productData.isbn);
    formProductData.append('mpn', _productData.mpn);
    formProductData.append('stock_status_id', _productData.stock_status_id);
    formProductData.append('image', _productData.image);
    formProductData.append('manufacturer_id', _productData.manufacturer_id);
    formProductData.append('shipping', _productData.shipping);
    formProductData.append('weight', _productData.weight);
    formProductData.append('weight_class_id', _productData.weight_class_id);
    formProductData.append('length', _productData.length);
    formProductData.append('width', _productData.width);
    formProductData.append('height', _productData.height);
    formProductData.append('length_class_id', _productData.length_class_id);
    formProductData.append('minimum', _productData.minimum);
    formProductData.append('status', _productData.status);
    formProductData.append('viewed', _productData.viewed);
    // MANDAMOS EL FORMULARIO
    const url = HTTP_SERVICE + '/products.php?operationType=' + operationType;
    return this._http.post(url, formProductData).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: Observable<string | Boolean>) => {
        console.error(err);
        return new Observable<string | Boolean>();
      }),
    );
  }
    /**********************************************************
   * CREATE & UPDATE NEW PRODUCT DESCRIPTION
   **********************************************************/
   CreateNewProductDescription(formProductDescription: ProductDescription, operationType: string) {
    const formData = new FormData();
    formData.append('product_id', formProductDescription.product_id);
    formData.append('language_id', '2');
    formData.append('user_id', formProductDescription.user_id);
    formData.append('name', formProductDescription.name);
    formData.append('description', formProductDescription.description);
    formData.append('tag', formProductDescription.tag);
    formData.append('meta_description', formProductDescription.meta_description);
    formData.append('meta_keyword', formProductDescription.meta_keyword);
    const url = HTTP_SERVICE + '/products.php?operationType=' + operationType;
    return this._http.post(url, formData).pipe(
      map( (response: any) => {
        console.log(response);
      }), catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
   }
  /**********************************************************
   * END CREATE NEW PRODUCT
   **********************************************************/
  /**********************************************************
   * CREATE NEW PRODUCT ATTR
   **********************************************************/
   createNewProductAttr(formAttr: ProductAttributes) {
     const formAttrData = new FormData();
     formAttrData.append('product_id', formAttr.product_id);
     formAttrData.append('filter_id', formAttr.filter_id);
     formAttrData.append('category_id', formAttr.category_id);
     formAttrData.append('manufacturer_id', formAttr.manufacturer_id);
     const url = HTTP_SERVICE + '/products.php?operationType=allAttrs';
     return this._http.post(url, formAttrData).pipe(
      map( (response: any) => {
        console.log(response);
      }), catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
   }
  /**********************************************************
   * END CREATE NEW PRODUCT ATTR
   **********************************************************/
  /**********************************************************
   * CREATE NEW PRODUCT DISCOUNT
   **********************************************************/
   createNewProductDiscount(formDiscount: ProductOffers, operationType: string) {
      const formDiscountData = new FormData();
      formDiscountData.append('product_id', formDiscount.product_id);
      formDiscountData.append('customer_group_id', formDiscount.customer_group_id);
      formDiscountData.append('product_discount_id', formDiscount.product_discount_id);
      formDiscountData.append('quantity', formDiscount.quantity);
      formDiscountData.append('price', formDiscount.price);
      formDiscountData.append('date_start', formDiscount.date_start);
      formDiscountData.append('date_end', formDiscount.date_end);
      const url = HTTP_SERVICE + '/products.php?operationType=' + operationType;
      return this._http.post(url, formDiscountData).pipe(
       map( (response: any) => {
         console.log(response);
       }), catchError( (err: Observable<string | Boolean>) => {
         console.log(err);
         return new Observable<string | boolean>();
       }),
     );
   }
  /**********************************************************
   * END CREATE NEW PRODUCT DISCOUNT
   **********************************************************/
    /**********************************************************
   * CREATE NEW PRODUCT DISCOUNT
   **********************************************************/
  createNewProductSpecial(formDiscount: ProductOffers, operationType: string) {
    const formDiscountData = new FormData();
    formDiscountData.append('product_id', formDiscount.product_id);
    formDiscountData.append('customer_group_id', formDiscount.customer_group_id);
    formDiscountData.append('quantity', formDiscount.quantity);
    formDiscountData.append('product_special_id', formDiscount.product_special_id);
    formDiscountData.append('price', formDiscount.price);
    formDiscountData.append('date_start', formDiscount.date_start);
    formDiscountData.append('date_end', formDiscount.date_end);
    const url = HTTP_SERVICE + '/products.php?operationType=' + operationType;
    return this._http.post(url, formDiscountData).pipe(
     map( (response: any) => {
       console.log(response);
     }), catchError( (err: Observable<string | Boolean>) => {
       console.log(err);
       return new Observable<string | boolean>();
     }),
   );
 }
 InsertProductImages(formImage: ProductImages, operationType: string) {
    const formImageData = new FormData();
    formImageData.append('product_id', formImage.product_id);
    formImageData.append('image', formImage.image);
    formImageData.append('sort_order', formImage.sort_order);
    const url = HTTP_SERVICE + '/products.php?operationType=' + operationType;
    return this._http.post(url, formImageData).pipe(
     map( (response: any) => {
       console.log(response);
     }), catchError( (err: Observable<string | Boolean>) => {
       console.log(err);
       return new Observable<string | boolean>();
     }),
   );
 }
/**********************************************************
 * END CREATE NEW PRODUCT DISCOUNT
 **********************************************************/
/**********************************************************
 * DELETE
 **********************************************************/
 DeleteProduct(dataProduct: ProductData, operationType: string) {
  const objectForm = new FormData();
  objectForm.append('product_id', dataProduct.product_id);
  const url = HTTP_SERVICE + '/products.php?operationType=' + operationType;
  return this._http.post(url, objectForm).pipe(
   map( (response: any) => {
     console.log(response);
   }), catchError( (err: Observable<string | Boolean>) => {
     console.log(err);
     return new Observable<string | boolean>();
   }),
 );
 }
DeleteProductSpecial(dataProduct: ProductOffers, operationType: string) {
  const objectForm = new FormData();
  objectForm.append('product_special_id', dataProduct.product_special_id);
  const url = HTTP_SERVICE + '/products.php?operationType=' + operationType;
  return this._http.post(url, objectForm).pipe(
   map( (response: any) => {
     console.log(response);
   }), catchError( (err: Observable<string | Boolean>) => {
     console.log(err);
     return new Observable<string | boolean>();
   }),
 );
}
DeleteProductDiscount(dataProduct: ProductOffers, operationType: string) {
  const objectForm = new FormData();
  objectForm.append('product_discount_id', dataProduct.product_discount_id);
  const url = HTTP_SERVICE + '/products.php?operationType=' + operationType;
  return this._http.post(url, objectForm).pipe(
   map( (response: any) => {
     console.log(response);
   }), catchError( (err: Observable<string | Boolean>) => {
     console.log(err);
     return new Observable<string | boolean>();
   }),
 );
}
/**********************************************************
 * END DELETE PRODUCT DATA
 **********************************************************/
/**********************************************************
 * OPENCART ITEMS
 **********************************************************/
  getItemOpencart(collection: string) {
    const url = HTTP_SERVICE + '/items.php?operationType=' + collection;
    return this._http.get(url).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: Observable<string | Boolean>) => {
        console.log(err);
        return new Observable<string | boolean>();
      }),
    );
  }
  getItemOpenCartWithId(collection: string, itemSearch: string,
     paramSearch: string | number) {
     let url = HTTP_SERVICE + '/items.php?operationType=' + collection;
      url += '&' + itemSearch + '=' + paramSearch;
      return this._http.get(url).pipe(
        map( (response: any) => {
          return response;
        }), catchError( (err: Observable<string | Boolean>) => {
          console.log(err);
          return new Observable<string | boolean>();
        }),
      );
  }
  insertItemOpencart(category: string | Blob, filter: string | Blob,
  filter_group_id: string | Blob, manufacturer: string | Blob,
  subcategory: string | Blob) {
      const objectItem = new FormData();
      objectItem.append('category', category);
      objectItem.append('filter', filter);
      objectItem.append('filter_group', filter_group_id);
      objectItem.append('manufacturer', manufacturer);
      objectItem.append('subcategory', subcategory);
      const url = HTTP_SERVICE + '/insertItem.php';
      return this._http.post(url, objectItem).pipe(
        map( (openCartItem: any) => {
            return openCartItem;
        }),
        catchError( (err: Observable<string | Boolean>) => {
          console.log(err);
          return new Observable<string | boolean>();
        }),
      );
  }
 /**********************************************************
 * END OPENCART ITEMS
 **********************************************************/
}