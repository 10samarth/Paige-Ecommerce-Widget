import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  sku: string = '';
  formError: string = '';
  product: Product = {
    id: '',
    sku: '',
    name: '',
    type: '',
    description: '',
    color: '',
    price: 0,
  };
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required, Validators.maxLength(55)]],
      description: ['', [Validators.required, Validators.maxLength(55)]],
      color: ['', [Validators.required, Validators.maxLength(55)]],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.sku = this.route.snapshot.params['sku'];
    this.getProduct(this.sku);
  }

  getProduct(sku: string): void {
    this.productService.getProduct(sku).subscribe((product: Product) => {
      this.product = product;
      this.productForm.patchValue({
        name: product.name,
        type: product.type,
        description: product.description,
        color: product.color,
        price: product.price,
      });
    });
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct = { ...this.product, ...this.productForm.value };
      this.productService
        .updateProduct(updatedProduct)
        .subscribe(() => this.router.navigate(['/product-list']));
    } else {
      this.formError =
        '* Please complete the form and resolve any validation issues.';
    }
  }
}
