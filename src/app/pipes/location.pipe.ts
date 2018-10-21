import { Pipe, PipeTransform } from '@angular/core';
import { OrdersService } from '../services/payment/orders.service';
import { PartialObserver } from 'rxjs';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  constructor(private _orders: OrdersService) {}

  transform(_id: number, operationType: string, reference: string): any {
    switch (reference) {
      case 'country':
        this._orders.getPipeCountryOrRegion(operationType, 'country_id', _id).subscribe(
          (addr: PartialObserver<any> | any): void => {
            if (addr.status) {
              this._orders.country = addr.name;
            } else {
              this._orders.country = '';
            }
          }
        );
        break;
        case 'region':
          this._orders.getPipeCountryOrRegion(operationType, 'zone_id', _id).subscribe(
            (addr: PartialObserver<any> | any): void => {
              if (addr.status) {
                this._orders.region = addr.name;
              } else {
                this._orders.region = '';
              }
            }
          );
          break;
    }
  }
}
