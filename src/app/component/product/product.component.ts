import { Component, Input } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product;
  productOptionCount: string[] = ['1', '2', '3', '4', '5'];
  selectedItem:string = '1';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void { }

  selectedChange(value: any): void {
    this.selectedItem = value;
  }

  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getCartProduct();
    let productInCart = cartProducts.find(product => product.id === product.id);
    if (productInCart) {
      productInCart.amount = this.selectedItem;
      productInCart ? this.productService.addProductToCart(cartProducts) : null;
    } else {
      cartProducts.push(Object.assign(product, { amount: this.selectedItem }));
      this.productService.addProductToCart(cartProducts);
      const message = `${product.name} has been added to your cart.`;
      alert(message);
    }
    this.refresh();
  }
  refresh(): void {
    window.location.reload();
  }
}
