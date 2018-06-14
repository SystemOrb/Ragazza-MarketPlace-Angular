import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { LinksComponent } from './links/links.component';
import { ModalFormComponent } from './modal-form/modal-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    SettingsComponent,
    LinksComponent,
    ModalFormComponent
  ], exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    SettingsComponent,
    LinksComponent,
    ModalFormComponent
  ]
})
export class SharedModule { }
