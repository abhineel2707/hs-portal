import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../models/product-category.model';
import { ProductCategoryService } from '../../services/product-category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.productCategoryService
      .getProductCategories()
      .subscribe((data: ProductCategory[]) => {
        this.productCategories = data;
      });
  }
}
