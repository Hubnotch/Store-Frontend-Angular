import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  storage = window.localStorage;
  constructor() { }
  getCartProduct(): Product[] {
    const getProduct = this.storage.getItem('products');
    return getProduct ? JSON.parse(getProduct) : [];
  }
  clearCart(): void {
    this.storage.clear();
  }
}
