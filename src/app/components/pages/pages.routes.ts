import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

/*
RUTA DE COMPONENTES
*/
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductTableComponent } from './admin/products/product-table/product-table.component';
import { ProductDataComponent } from './admin/products/create-product/product-data/product-data.component';
import { ProductDescriptionComponent } from './admin/products/create-product/product-description/product-description.component';
import { ProductAttributesComponent } from './admin/products/create-product/product-attributes/product-attributes.component';
import { ProductDiscountComponent } from './admin/products/create-product/product-discount/product-discount.component';
import { ProductSpecialComponent } from './admin/products/create-product/product-special/product-special.component';
import { ProductImagesComponent } from './admin/products/create-product/product-images/product-images.component';
import { PagesComponent } from './pages.component';
import { SellersComponent } from './sellers/sellers.component';
import { BalanceComponent } from './balance/balance.component';
import { InvoiceComponent } from './admin/orders/invoice.component';
import { VerifyLoginGuard } from '../../GUARDS/verify-login.guard';
import { FilterTableComponent } from './admin/products/create-product/product-attributes/filter-table.component';
import { ProductAuthorGuard } from '../../GUARDS/product-author.guard';
import { SearchProductComponent } from './admin/products/search-product/search-product.component';
import { RefreshComponent } from './refresh/refresh.component';



const routes: Routes = [
    /*{path: '', component: PagesComponent,
    canActivate: [VerifyLoginGuard],
     children: [*/
       {path: 'dashboard', component: DashboardComponent, data: {title: 'Panel de control'}},
       {path: 'profile', component: ProfileComponent, data: {title: 'Datos de la empresa'}},
       {path: 'orders', component: OrdersComponent, data: {title: 'Datos del pedido'}},
       {path: 'invoice/:id', component: InvoiceComponent, data: {title: 'Ordenes'}},
       {path: 'sellers', component: SellersComponent, data: {title: 'Historial de ventas'}},
       {path: 'balance', component: BalanceComponent, data: {title: 'Balance'}},
       {path: 'products', component: ProductTableComponent, data: {title: 'Mis productos publicados'}},
       {path: 'refresh/:id/:toURL', component: RefreshComponent, data: {title: 'Refrescador'}},
       {path: 'product-info/:id',
       canActivate: [ProductAuthorGuard],
        component: ProductDescriptionComponent,
         data: {title: 'Información del producto'}
        },
        {
          path: 'search/:query',
          component: SearchProductComponent,
          data: {title: 'Buscador de productos'}
        },
       {path: 'product-data/:id',
        canActivate: [ProductAuthorGuard],
         component: ProductDataComponent,
          data: {title: 'Datos del producto'}
        },
       {path: 'product-help/:id',
        canActivate: [ProductAuthorGuard],
         component: ProductAttributesComponent,
          data: {title: 'Datos de busqueda del producto'}
        },
       {path: 'filters/:id',
        canActivate: [ProductAuthorGuard],
         component: FilterTableComponent,
          data: {title: 'Filtros de busqueda del producto'}
        },
       {path: 'product-discount/:id',
        canActivate: [ProductAuthorGuard],
         component: ProductDiscountComponent,
          data: {title: 'Datos de descuento del producto'}
        },
       {path: 'product-special/:id',
        canActivate: [ProductAuthorGuard],
         component: ProductSpecialComponent,
          data: {title: 'Oferta especial del producto'}
        },
       {path: 'product-images/:id',
        canActivate: [ProductAuthorGuard],
         component: ProductImagesComponent,
          data: {title: 'Imagenes del producto'}
        },
      // ]},

    { path: '', pathMatch: 'full', redirectTo: '/profile' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
