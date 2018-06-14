import { Pipe, PipeTransform } from '@angular/core';
import { HTTP_SERVICE, PHOTO_SERVICES } from '../config/config';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(value: string, url?: string): any {
    if (!value) {
      return HTTP_SERVICE + '/img/no-image.jpg';
    } else {
      return PHOTO_SERVICES + '/' + value;
    }
  }
}
