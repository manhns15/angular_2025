import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

interface Product {
  title: string;
  // Thêm các trường khác nếu cần
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product: Product | null = null;
  isLoading = false;
  errMsg = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadProduct(id);
      } else {
        this.errMsg = 'ID sản phẩm không hợp lệ!';
      }
    });
  }

  loadProduct(id: number) {
    this.isLoading = true;
    this.errMsg = '';
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errMsg = 'Đã có lỗi xảy ra: ' + err.message;
        this.isLoading = false;
      },
    });
  }
}
