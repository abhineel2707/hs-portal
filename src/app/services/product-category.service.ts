// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/product-category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private dataUrl = 'data/product-category.json';

  constructor(private http: HttpClient) {}

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.dataUrl);
  }
}
