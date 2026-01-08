import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryService } from '../../data-access/category.service';
import {
  ProductCreate,
  ProductsService,
} from '../../data-access/products.service';
import { ProductStoreService } from '../../data-access/product.store.service';

@Component({
  selector: 'app-product-update-page',
  templateUrl: './product-update-page.component.html',
  styleUrls: ['./product-update-page.component.scss'],
})
export class ProductUpdatePageComponent implements OnInit {
  categories: Category[] = [];
  isLoadingProduct = true;
  notFound = false;

  readonly loading$ = this.productStore.loading$;
  readonly error$ = this.productStore.error$;

  readonly form = this.fb.group({
    title: ['', Validators.required],
    price: [null as number | null, [Validators.required, Validators.min(0)]],
    description: [''],
    image: [''],
    categoryId: [null as number | null],
  });

  private productId: number | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoryService,
    private readonly productStore: ProductStoreService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id || Number.isNaN(id)) {
      this.isLoadingProduct = false;
      this.notFound = true;
      return;
    }

    this.productId = id;

    this.categoryService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
    });

    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.form.patchValue({
          title: product.title,
          price: product.price,
          description: product.description ?? '',
          image: product.images?.[0] ?? '',
          categoryId: product.categoryId ?? null,
        });
        this.isLoadingProduct = false;
      },
      error: () => {
        this.isLoadingProduct = false;
        this.notFound = true;
      },
    });
  }

  submit(): void {
    if (this.form.invalid || this.productId === null) {
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

    this.productStore.updateProduct(this.productId, payload);
    this.router.navigate(['/products']);
  }
}
