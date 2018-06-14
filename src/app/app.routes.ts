import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PagesComponent } from './components/pages/pages.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
    { path: 'dashboard', component: PagesComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: NotFoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot( routes, {useHash: true} );
