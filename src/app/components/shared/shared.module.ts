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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalImageComponent } from './modal-form/modal-image.component';
import { ImagesPipe } from '../../pipes/images.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    SettingsComponent,
    LinksComponent,
    ModalFormComponent,
    ModalImageComponent,
    ImagesPipe
  ], exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    SettingsComponent,
    LinksComponent,
    ModalFormComponent,
    ModalImageComponent,
    ImagesPipe
  ]
})
export class SharedModule { }
