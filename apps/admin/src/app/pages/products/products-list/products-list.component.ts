import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@black-bird/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product Deleted successfuly'
            });
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Not able to delete Product!'
            })
        });
      },
      reject: () => {}
    });
  }

  _getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
