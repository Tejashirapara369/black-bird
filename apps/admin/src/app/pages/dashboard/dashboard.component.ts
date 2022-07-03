import { Component, OnInit } from '@angular/core';
import { OrderService } from '@black-bird/orders';
import { ProductsService } from '@black-bird/products';
import { UserService } from '@black-bird/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  totalUser: number;
  totalSales: string;
  totalProduct: number;
  totalOrder: number;

  constructor(
    private orderService: OrderService,
    private productService: ProductsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._getTotalOrder();
    this._getTotalProduct();
    this._getTotalSales();
    this._getTotalUser();
  }

  private _getTotalUser() {
    this.userService.getTotalUsers().subscribe(({ userCount }) => {
      this.totalUser = userCount;
    });
  }
  private _getTotalProduct() {
    this.productService.getTotalProduct().subscribe(({ productCount }) => {
      this.totalProduct = productCount;
    });
  }
  private _getTotalOrder() {
    this.orderService.getTotalOrder().subscribe(({ totalCount }) => {
      this.totalOrder = totalCount;
    });
  }
  private _getTotalSales() {
    this.orderService.getTotalSales().subscribe((totalSale) => {
      this.totalSales = totalSale;
    });
  }
}
