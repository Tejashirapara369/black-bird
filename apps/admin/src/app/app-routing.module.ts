import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@black-bird/users';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoryListComponent
      },
      {
        path: 'categories/form',
        component: CategoryFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoryFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductFormComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/form',
        component: UserFormComponent
      },
      {
        path: 'users/form/:id',
        component: UserFormComponent
      },
      {
        path: 'orders',
        component: OrderListComponent
      },
      {
        path: 'orders/:id',
        component: OrderDetailComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule {}
