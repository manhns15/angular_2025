import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../data-access/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.product.id);
  }

  onDelete(): void {
    this.delete.emit(this.product.id);
  }
}
