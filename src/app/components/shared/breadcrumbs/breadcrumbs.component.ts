import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  tags = {
    title: ''
  };
  constructor(private route: Router, private title: Title, private meta: Meta) {
    this.getEvents();
   }

  ngOnInit() {
  }
  getEvents() {
    /*this.route.events.subscribe (
      (response: any) => console.log(response));*/
      this.route.events.pipe(
        filter(  target => target instanceof ActivationEnd ),
        filter(  (target: ActivationEnd) => target.snapshot.firstChild === null),
        map( (target: ActivationEnd) => {
          return target.snapshot.data;
        })
      ).subscribe(
        (resp: any) => {
          this.tags = resp;
          this.title.setTitle(this.tags.title);
          const description: MetaDefinition = {
            name: 'description',
            content: this.textGenerator(this.tags.title).description
          };
          this.meta.updateTag(description);
        }
      );
  }
  textGenerator(title) {
    switch (title) {
      case 'Panel de control':
        return {
          keywords: 'panel, control, dashboard, admin, administración, profile, ragazza, shop, empresas, mercado, tienda, ropa',
          description: 'Ragazza Shop empresa, para vender tus productos en linea de forma rapida y concisa, obten ganancias',
        };
        case 'Datos de la empresa':
        return {
          keywords: 'panel, control, dashboard, admin, administración, profile, ragazza, shop, empresas, mercado, tienda, ropa',
          description: 'Ragazza Shop empresa, para vender tus productos en linea de forma rapida y concisa, obten ganancias',
        };
        case 'Ordenes':
        return {
          keywords: 'panel, control, dashboard, admin, administración, profile, ragazza, shop, empresas, mercado, tienda, ropa',
          description: 'Ragazza Shop empresa, para vender tus productos en linea de forma rapida y concisa, obten ganancias',
        };
        case 'Datos de la empresa':
        return {
          keywords: 'panel, control, dashboard, admin, administración, profile, ragazza, shop, empresas, mercado, tienda, ropa',
          description: 'Ragazza Shop empresa, para vender tus productos en linea de forma rapida y concisa, obten ganancias',
        };
        case 'Datos del producto':
        return {
          keywords: 'panel, control, dashboard, admin, administración, profile, ragazza, shop, empresas, mercado, tienda, ropa',
          description: 'Ragazza Shop empresa, para vender tus productos en linea de forma rapida y concisa, obten ganancias',
        };
        default:
             return {
          keywords: 'panel, control, dashboard, admin, administración, profile, ragazza, shop, empresas, mercado, tienda, ropa',
          description: 'Ragazza Shop empresa, para vender tus productos en linea de forma rapida y concisa, obten ganancias',
        };
    }
  }

}
