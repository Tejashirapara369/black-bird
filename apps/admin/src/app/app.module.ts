import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService, JwtInterceptor, UsersModule } from '@black-bird/users';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CategoriesService } from '@black-bird/products';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { AppRoutingModule } from './app-routing.module';

const UX_MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  TableModule,
  InputTextModule,
  ColorPickerModule,
  ToastModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoryListComponent,
    CategoryFormComponent,
    ProductsListComponent,
    ProductFormComponent,
    UserListComponent,
    UserFormComponent,
    OrderListComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    UsersModule,
    [...UX_MODULES]
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
