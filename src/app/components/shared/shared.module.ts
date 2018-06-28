  // MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

 // Dependencies
import { HeaderComponent } from './header/header.component';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SettingsComponent } from './settings/settings.component';
import { LinksComponent } from './links/links.component';
import { ModalImageComponent } from './modal-form/modal-image.component';
import { ImagesPipe } from '../../pipes/images.pipe';
import { PushComponent } from './push/push.component';

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
    ImagesPipe,
    PushComponent
  ], exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    SettingsComponent,
    LinksComponent,
    ModalFormComponent,
    ModalImageComponent,
    ImagesPipe,
    PushComponent
  ]
})
export class SharedModule { }
