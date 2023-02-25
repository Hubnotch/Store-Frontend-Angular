import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // storage = window.localStorage;

  constructor() { }
  
  getCartProduct(): Product[] {
    const getProduct = window.localStorage.getItem('products');
    return Array.isArray(getProduct) ? JSON.parse(getProduct) : [];
  }
  clearCart(): void {
    window.localStorage.clear();
  }
}
