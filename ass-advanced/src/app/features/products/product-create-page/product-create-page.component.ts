import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, CategoryService } from '../../data-access/category.service';
import { ProductCreate } from '../../data-access/products.service';
import { ProductStoreService } from '../../data-access/product.store.service';

@Component({
  selector: 'app-product-create-page',
  templateUrl: './product-create-page.component.html',
  styleUrls: ['./product-create-page.component.scss'],
})
export class ProductCreatePageComponent implements OnInit {
  categories: Category[] = [];
  readonly loading$ = this.productStore.loading$;
  readonly error$ = this.productStore.error$;

  readonly form = this.fb.group({
    title: ['', Validators.required],
    price: [null as number | null, [Validators.required, Validators.min(0)]],
    description: [''],
    image: [''],
    categoryId: [null as number | null],
  });

  constructor(
    private readonly categoryService: CategoryService,
    private readonly productStore: ProductStoreService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload: ProductCreate = {
      title: value.title ?? '',
      price: value.price ?? 0,
      description: value.description || undefined,
      images: value.image ? [value.image] : undefined,
      categoryId: value.categoryId ?? undefined,
    };

    this.productStore.createProduct(payload);
    this.router.navigate(['/products']);
  }
}
