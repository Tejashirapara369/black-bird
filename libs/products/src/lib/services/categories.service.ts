import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories')
  }
  
  getCategoryById(catId: string) {
    return this.http.get<Category[]>(`http://localhost:3000/api/v1/categories/${catId}`)
  }

  createCategory(category: Category) {
    return this.http.post<Category>('http://localhost:3000/api/v1/categories', category)
  }
 
  updateCategory(catId: string, category: Category) {
    return this.http.put<Category>(`http://localhost:3000/api/v1/categories/${catId}`, category)
  }
  
  deleteCategory(catId: string) {
    return this.http.delete<Category>(`http://localhost:3000/api/v1/categories/${catId}`)
  }
}
