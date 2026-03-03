import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsStore } from '../../../store/products.store';

@Component({
  selector: 'app-products-forms',
  standalone: false,
  templateUrl: './products-forms.html',
  styleUrl: './products-forms.scss',
})
export class ProductsForms implements OnInit {
  private fb = inject(FormBuilder);
  private productsStore = inject(ProductsStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // isEditMode = true khi URL có dạng /products/:id/edit
  // isEditMode = false khi URL là /products/create
  isEditMode = false;
  editId: string | null = null;

  productForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(15000)]],
      stock: [0, [Validators.required, Validators.min(1)]],
      category: ['', [Validators.required]],
      description: [''],
    },
    { updateOn: 'submit' },
  );

  ngOnInit(): void {
    // Đọc :id từ route → nếu có thì đây là Edit mode
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.editId = id;

      // Load sản phẩm cần sửa và điền vào form
      this.productsStore.loadProduct(this.editId);
      this.productsStore.product$.subscribe((product) => {
        if (product) {
          this.productForm.patchValue({
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            description: product.description,
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.getRawValue();

    if (this.isEditMode && this.editId) {
      // PUT — cập nhật sản phẩm
      this.productsStore.updateProduct(this.editId, formValue);
    } else {
      // POST — tạo mới
      this.productsStore.createProduct(formValue);
    }

    this.router.navigate(['/products']);
  }
}
