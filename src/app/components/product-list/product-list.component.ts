import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  pageSize: number = 8;
  currentPage: number = 1;
  totalPages: number = 0;
  maxPagesToShow: number = 5;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.route.params.subscribe((params) => {
        const productCategoryId = +params['productCategoryId'];
        this.filteredProducts = productCategoryId
          ? this.products.filter(
              (product) => product.productCategoryId === productCategoryId
            )
          : this.products;
        this.currentPage = 1; // Reset to the first page whenever the filter changes
        this.updatePaginatedProducts();
      });
    });
  }

  updatePaginatedProducts() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  onPageChange(page: number, event: Event) {
    event.preventDefault(); // Prevent default link behavior
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  getPages(): number[] {
    const pages: number[] = [];
    const halfRange = Math.floor(this.maxPagesToShow / 2);
    let startPage = Math.max(1, this.currentPage - halfRange);
    let endPage = Math.min(this.totalPages, this.currentPage + halfRange);

    if (this.currentPage - halfRange < 1) {
      endPage = Math.min(
        this.totalPages,
        endPage + (1 - (this.currentPage - halfRange))
      );
    }

    if (this.currentPage + halfRange > this.totalPages) {
      startPage = Math.max(
        1,
        startPage - (this.currentPage + halfRange - this.totalPages)
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
