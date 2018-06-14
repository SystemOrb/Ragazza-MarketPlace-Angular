import { Routes, RouterModule } from '@angular/router';
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



const routes: Routes = [
    {path: '', component: PagesComponent,
     children: [
       {path: 'dashboard', component: DashboardComponent, data: {title: 'Panel de control'}},
       {path: 'profile', component: ProfileComponent, data: {title: 'Datos de la empresa'}},
       {path: 'orders', component: OrdersComponent, data: {title: 'Datos del pedido'}},
       {path: 'invoice/:id', component: InvoiceComponent, data: {title: 'Ordenes'}},
       {path: 'sellers', component: SellersComponent, data: {title: 'Historial de ventas'}},
       {path: 'balance', component: BalanceComponent, data: {title: 'Balance'}},
       {path: 'products', component: ProductTableComponent, data: {title: 'Mis productos publicados'}},
       {path: 'product-info/:id', component: ProductDescriptionComponent, data: {title: 'Información del producto'}},
       {path: 'product-data/:id', component: ProductDataComponent, data: {title: 'Datos del producto'}},
       {path: 'product-help/:id', component: ProductAttributesComponent, data: {title: 'Datos de busqueda del producto'}},
       {path: 'product-discount/:id', component: ProductDiscountComponent, data: {title: 'Datos de descuento del producto'}},
       {path: 'product-special/:id', component: ProductSpecialComponent, data: {title: 'Oferta especial del producto'}},
       {path: 'product-images/:id', component: ProductImagesComponent, data: {title: 'Imagenes del producto'}}
     ]},

    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
