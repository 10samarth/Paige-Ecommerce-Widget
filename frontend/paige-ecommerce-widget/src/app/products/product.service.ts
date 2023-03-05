import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = `${environment.baseUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(catchError(this.handleError));
  }

  getProduct(sku: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.productsUrl}/${sku}`)
      .pipe(catchError(this.handleError));
  }

  updateProduct(product: Product): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .put<void>(`${this.productsUrl}/${product.sku}`, product, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  deleteProduct(sku: string): Observable<void> {
    return this.http
      .delete<void>(`${this.productsUrl}/${sku}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Error code ${error.status}`);
    }
    return throwError(
      () => new Error('Network connection error. Please try again later.')
    );
  }
}
