import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDescription } from '../../../../../models/products/product-description.class';
import { SearchService } from '../../../../../services/products/search.service';
import { PHOTO_SERVICES } from '../../../../../config/config';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ProductService } from '../../../../../services/products/product.service';
import { SearchProducts } from '../../../../../models/products/product-search.class';
// declare function init_plugins();
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: []
})
export class SearchProductComponent implements OnInit {
  QUERY: string;
  URL = PHOTO_SERVICES + '/';
  ITEMS: ProductDescription[] = [];
  constructor(private param: ActivatedRoute,
    private search: SearchService, private _user: AuthService,
    private _product: ProductService) {
  }

  ngOnInit() {
    // init_plugins();
    this.param.params.subscribe(
      (get: any) => {
        this.QUERY = get['query'];
      }
    );
    this.updateComponent().then(
      (items: any) => {
        const object: ProductDescription[] = new Array();
        object.push({
          'product_id' : items.data.product_id,
          'language_id' : items.data.language_id,
          'name': items.data.name,
          'description': items.data.description,
          'tag' : items.data.tag,
          'user_id': items.data.user_id,
          'meta_description': items.data.meta_description,
          'meta_keyword': items.data.meta_keyword,
          'meta_tags': items.data.meta_tags,
          'image': PHOTO_SERVICES + '/' + items.image
        });
        this.ITEMS.push(object[0]);
      }
    ).catch(
      (err: any) => {
        console.log(err);
      }
    );
  }
  updateComponent() {
    return new Promise<ProductDescription[]>( (resolve, reject) => {
        this.param.params.subscribe(
          (get: any) => {
              const searchQuery = new SearchProducts(this._user.user_id, get['query']);
              this._product.findProducts(searchQuery, 'searchProduct').subscribe(
                (explorer: any) => {
                  if (explorer.status) {
                    console.log(explorer);
                    resolve(explorer);
                  } else {
                    reject(false);
                  }
                }
              );
          }
        );
    });
  }
}
