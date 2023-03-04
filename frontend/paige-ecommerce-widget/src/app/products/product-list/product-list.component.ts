import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  filteredProducts: Product[] = [];
  selectedColors: string[] = [];
  colors: string[] = [];

  dropdownSettings = {};

  // Pagination variables
  currentPage = 1;
  productsPerPage = 10;
  productListLength: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.filteredProducts = data;
      let result = this.filteredProducts.map((product) =>
        product.color.toLowerCase()
      );
      this.colors = Array.from(new Set(result));
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'color',
      textField: 'color',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  deleteProduct(sku: string): void {
    this.productService.deleteProduct(sku).subscribe(() => {
      this.filteredProducts = this.filteredProducts.filter(
        (p) => p.sku !== sku
      );
    });
  }

  filterProductsByColor(): Product[] {
    let result: Product[] = [];
    for (let i = 0; i < this.selectedColors.length; i++) {
      const selectedColor = this.selectedColors[i];
      result = result.concat(
        this.filteredProducts.filter((product) =>
          product.color.toLowerCase().includes(selectedColor.toLowerCase())
        )
      );
    }
    return Array.from(new Set(result));
  }

  get productList(): Product[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    let result: Product[] = [];
    if (this.selectedColors.length > 0) {
      result = this.filterProductsByColor();
    } else {
      result = this.filteredProducts;
    }
    this.productListLength = result.length;
    return result.slice(startIndex, endIndex);
  }

  get pages(): number[] {
    const pageCount = Math.ceil(this.productListLength / this.productsPerPage);
    const navPages = [];
    for (let i = 1; i <= pageCount; i++) {
      navPages.push(i);
    }
    return navPages;
  }
}
