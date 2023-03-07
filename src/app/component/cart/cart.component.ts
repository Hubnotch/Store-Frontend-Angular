import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  @Output() userInfo = new EventEmitter();
  totalPrice: number | string = '';
  productCount: string[] = ['1', '2', '3', '4', '5'];
  selectedItem = '';

  constructor(private cartService: CartService, private route: Router) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProduct();
    this.calculateTotal();
  }

  onSubmit(value: any): void {
    this.cartService.clearCart();
    this.route.navigate([`success/${value.firstname}/${this.totalPrice}`]);
  }
  refersh(): void {
    window.location.reload();
  }

  // selectChange(value: string, product: Product): void {
  //   const index = this.cartProducts.indexOf(product);
  //   this.cartProducts[index] = product;
  //   this.cartProducts[index].amount = value;
  //   localStorage.setItem('products', JSON.stringify(this.cartProducts));
  //   this.calculateTotal();
  //   this.refersh()
  // }
  selectChange(value: string, product: Product): void {
    const updatedProducts = this.cartProducts.map((p: Product) => {
      if (p.id === product.id) {
        return {
          ...p,
          amount: value
        };
      }
      return p;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    this.calculateTotal();
    this.refersh();
  } 

  // calculateTotal(): void {
  //   this.totalPrice = this.cartProducts.reduce((total, product) => {
  //     this.totalPrice = parseFloat(
  //       (total + product.price * Number(product.amount)).toFixed(2)
  //     );
  //     return this.totalPrice;
  //   }, 0);
  // }
  calculateTotal(): void {
    this.totalPrice = this.cartProducts.reduce(
      (total, product) => total + product.price * Number(product.amount),
      0
    );
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

//   deletedItem(id: number) {
//     const storedProducts = this.cartService.getCartProduct();
//     const products = storedProducts.filter((product: Product) => product.id !== id);
//     window.localStorage.clear();
//     localStorage.setItem('products', JSON.stringify(products));
//     this.refersh();
//     this.calculateTotal();
// }
  deletedItem(id: number) {
    const storedProducts = this.cartService.getCartProduct();
    const products = storedProducts.filter((product: Product) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    this.refersh();
    this.calculateTotal();
  }
  // deletedItem(id: number) {
  //   const products = this.localStorageService.get('products') || [];
  //   const updatedProducts = products.filter((product: Product) => product.id !== id);
  //   this.localStorageService.set('products', updatedProducts);
  //   this.refersh();
  //   this.calculateTotal();
  // }



}
