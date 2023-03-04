import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';



import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private productsUrl =  `${environment.baseUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(sku: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${sku}`);
  }

  updateProduct(product: Product): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<void>(`${this.productsUrl}/${product.sku}`, product, {
      headers,
    });
  }

  deleteProduct(sku: string): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${sku}`);
  }
}
