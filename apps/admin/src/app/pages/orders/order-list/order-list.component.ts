import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '@black-bird/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order-status.constant';

@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  readonly orderStatus = ORDER_STATUS;

  constructor(
    private orderService: OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getOrderList();
  }

  deleteOrder(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(id).subscribe({
          next: () => {
            this._getOrderList();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order Deleted successfuly'
            });
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Not able to delete Order!'
            })
        });
      },
      reject: () => {}
    });
  }

  _getOrderList() {
    this.orderService.getOrders().subscribe((res) => {
      this.orders = res;
    });
  }
}
