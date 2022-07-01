import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiURL = `${environment.apiURL}categories`;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.apiURL);
  }

  getCategoryById(catId: string) {
    return this.http.get<Category[]>(`${this.apiURL}/${catId}`);
  }

  createCategory(category: Category) {
    return this.http.post<Category>(this.apiURL, category);
  }

  updateCategory(catId: string, category: Category) {
    return this.http.put<Category>(`${this.apiURL}/${catId}`, category);
  }

  deleteCategory(catId: string) {
    return this.http.delete<unknown>(`${this.apiURL}/${catId}`);
  }
}
