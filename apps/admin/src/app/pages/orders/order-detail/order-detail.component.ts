import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderService } from '@black-bird/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order-status.constant';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  statusArray = [];
  selectedStatus: string;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._checkAndGetOrder();
  }

  statusChange(event) {
    console.log('event', event);
    this.orderService
      .updateOrderStatus(this.route.snapshot.params.id, event.value)
      .subscribe((res) => {
        console.log('res', res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Order status updated to ${ORDER_STATUS[res.status].label}`
        });
      });
  }

  private _checkAndGetOrder() {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.orderService.getOrderById(id).subscribe((res) => {
          this.selectedStatus = res.status;
          console.log('this.selectedStatus', this.selectedStatus);
          this.order = res;
        });
      }
    });
  }

  private _mapOrderStatus() {
    Object.keys(ORDER_STATUS).forEach((key) => {
      this.statusArray.push({ id: key, name: ORDER_STATUS[key].label });
    });
  }
}
