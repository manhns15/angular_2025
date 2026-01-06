import { Component } from '@angular/core';
interface ProductForm {
  productName: string;
  price: number;
  category: string;
  description: string;
  sku: string;
}

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent {
  model: ProductForm = {
    productName: '',
    price: 0,
    category: '',
    description: '',
    sku: '',
  };
  onSubmit(data: ProductForm) {
    console.log(data);
  }
}
