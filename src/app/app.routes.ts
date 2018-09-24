import { Routes, RouterModule} from '@angular/router';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PagesComponent } from './components/pages/pages.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { VerifyLoginGuard } from './GUARDS/verify-login.guard';
import { CheckoutComponent } from './components/pages/payments/checkout/checkout.component';
import { ConfirmComponent } from './components/pages/payments/checkout/confirm.component';

const routes: Routes = [
    { path: '',
    component: PagesComponent,
    canActivate: [VerifyLoginGuard],
    loadChildren: './components/pages/pages.module#PagesModule'
    },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    {path: 'cart/checkout/:keyCustomer', component: CheckoutComponent, data: {title: 'Confirmar Compra'}},
    {path: 'confirm', component: ConfirmComponent, data: {title: 'p2p'}},
    { path: '**', component: NotFoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot( routes, {useHash: false} );
