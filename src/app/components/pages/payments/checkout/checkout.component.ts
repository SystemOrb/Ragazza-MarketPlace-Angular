import { Component, OnInit } from '@angular/core';
import { KushiService } from '../../../../services/payment/kushi.service';
import { ActivatedRoute } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { CartItems } from '../../../../models/products/cart.class';
import { ProductData } from '../../../../models/products/product-data.class';
import { HTTP_SERVICE } from '../../../../config/config';
import { UserShop } from '../../../../models/empresas.class';
import { TemplatePayment } from '../../../../models/payment/template.class';
import { Country } from '../../../../models/region/country.class';
import { NgForm } from '@angular/forms';
declare function init_plugins();
declare function init_kushki();
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit {
  idcustomer: number;
  cartItems: CartItems[] | any = '';
  sumCart: number;
  displaySelect: boolean = true;
  public setterForm: TemplatePayment | any = '';
  public CustomerAddress: TemplatePayment[] | any = '';
  public URL: string = `${HTTP_SERVICE}/p2p/request.php`;
  public countries: Country[] | any = '';
  public region: any = '';

// autocompleter
  firstname: string;
  lastname: string;
  address: string;
  address2: string;
  country: number;
  state: number;
  postcode: string;
  city: string;
  telephone: string;

  constructor(private _kushki: KushiService, private _query: ActivatedRoute) {
    this._query.params.subscribe((param: PartialObserver<any> | any): void => {
      if (param['keyCustomer'] === 'nuevo') {
        window.location.href = 'http://www.ragazzashop.com/login.php';
      }
       this.idcustomer = param['keyCustomer'];
    });
  }

  async ngOnInit() {
    init_plugins();
    this.cartItems = await this.getCartItems();
    const cartOperation = await this.getCartSum();
    this.sumCart = Number(cartOperation);
          setTimeout(async () => {
            init_kushki();
          }, 1000);
    this.CustomerAddress = await this.getCustomerAddress();
    this.countries = await this.GetAllCountries();
    this.region = await this.getZones(62);
  }
  getCartItems(): Promise <CartItems[] | boolean> {
    return new Promise((resolve, reject) => {
      this._kushki.getCarrito(this.idcustomer, 'cartItems').subscribe(
        async (cart: PartialObserver<any> | any) => {
          // Metemos la info del producto en el parametro product
          const arrayCartItems = new Array();
          // Por cada item en el carrito lo enlazamos con su info principal
          for (const items of cart.data) {
             const productData = await this.getCartData(Number(items.cart_product));
             const productDescription = await this.getCartDescription(Number(items.cart_product));
             // const ShopInfo = await this.getShopBussiness()
             // Seteamos la info
             items.cart_product = productData[0];
             items.option = productDescription[0];
             // Buscamos la información de la empresa
             // si es 0 es nivel de sistema, si es diferente de 0 es una empresa
             // tslint:disable-next-line:triple-equals
             if (items.cart_product.user_id != 0) {
                const ShopAffiliated: any = await this.getShopBussiness(Number(items.cart_product.user_id));
                items.store = ShopAffiliated.data[0];
             }
            // Guardamos el nuevo array
            arrayCartItems.push(items);
          }
          // Devolvemos el array
          resolve(arrayCartItems);
        }
      );
    });
  }
  // Para obtener información del producto del carrito
  getCartData(keyProd: number): Promise<ProductData> {
    return new Promise((resolve, reject) => {
      this._kushki.getProductData(keyProd, 'selectData').subscribe(
        (prod: PartialObserver<any> | any): void => {
          resolve(prod);
        }
      );
    });
  }
  getCartDescription(keyProd: number): Promise<ProductData> {
    return new Promise((resolve, reject) => {
      this._kushki.getProductData(keyProd, 'selectDescription').subscribe(
        (prod: PartialObserver<any> | any): void => {
          resolve(prod);
        }
      );
    });
  }
  getShopBussiness(keyShop: number): Promise<UserShop> {
      return new Promise((resolve, reject) => {
        this._kushki.BussinessShop(keyShop, 'displayShop').subscribe(
          (RgzaShop: PartialObserver<any> | any): void => {
            resolve(RgzaShop);
          }
        );
      });
  }
  // Get Sum cart
  getCartSum(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._kushki.getCarrito(this.idcustomer, 'sumCart').subscribe(
        (prod: PartialObserver<any> | any): void => {
          if (prod.status) {
            resolve(prod.total);
          } else {
            throw new Error('No puede obtener la suma de los items');
          }
        }
      );
    });
  }
  // Obtener direcciones de envío guardadas
  getCustomerAddress(): Promise<TemplatePayment> {
    return new Promise((resolve, reject) => {
      this._kushki.CustomerAddress(this.idcustomer, 'getAddress').subscribe(
        (prod: PartialObserver<any> | any): void => {
          if (prod.status) {
            resolve(prod.data);
          } else {
            this.displaySelect = false;
          }
        }
      );
    });
  }
  // Paises disponibles
  GetAllCountries(): Promise<Country> {
    return new Promise((resolve, reject) => {
      this._kushki.Countries('getAllCountries').subscribe(
        (country: PartialObserver<any> | any): void => {
          resolve(country);
        }
      );
    });
  }
  // Setear el formulario automaticamente
  SetAddressDefault(addr_id: string | number) {
    for (const addr of this.CustomerAddress) {
        if (addr.address_id === addr_id ) {
          // this.setterForm = addr;
          this.firstname = addr.firstname;
          this.lastname = addr.lastname;
          this.address = addr.address_1;
          this.address2 = addr.address_2;
          this.country = addr.country_id;
          this.state = addr.zone_id;
          this.postcode = addr.postcode;
          this.city = addr.city;
          this.telephone = addr.telephone;
        }
    }
  }
  getZones(country_id: number) {
    return new Promise((resolve, reject) => {
      this._kushki.Region(country_id, 'getRegion').subscribe(
        (Region: PartialObserver<any> | any): void => {
          resolve(Region);
        }
      );
    });
  }
  async changeRegion(country_id: number) {
    this.region = await this.getZones(country_id);
  }
  verifyForm(data: NgForm) {
    return false;
  }
}
