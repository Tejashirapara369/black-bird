import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiURL = `${environment.apiURL}orders`;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>(this.apiURL);
  }

  getOrderById(orderId: string) {
    return this.http.get<Order>(`${this.apiURL}/${orderId}`);
  }

  // createOrder(category: Order) {
  //   return this.http.post<Order>(this.apiURL, category);
  // }

  updateOrderStatus(orderId: string, status: string) {
    return this.http.put<Order>(`${this.apiURL}/${orderId}`, { status });
  }

  deleteOrder(orderId: string) {
    return this.http.delete<unknown>(`${this.apiURL}/${orderId}`);
  }
}
