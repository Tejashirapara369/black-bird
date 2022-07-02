import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURL = `${environment.apiURL}products`;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.apiURL);
  }

  getProductById(productId: string) {
    return this.http.get<Product>(`${this.apiURL}/${productId}`);
  }

  createProduct(product: FormData) {
    return this.http.post<Product>(this.apiURL, product);
  }

  updateProduct(productId: string, product: FormData) {
    return this.http.put<Product>(`${this.apiURL}/${productId}`, product);
  }

  deleteProduct(productId: string) {
    return this.http.delete<unknown>(`${this.apiURL}/${productId}`);
  }
}
