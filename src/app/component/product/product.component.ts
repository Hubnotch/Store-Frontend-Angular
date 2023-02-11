import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: Product;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter();

  constructor() {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    }
  }
  addItemToCart(product:Product): void {
    this.addToCart.emit(product);
  }
 
}
