import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
pageTitle:string = 'My Shopping'
  cartProductList!: Product[];
  faCart = faCartShopping;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartProductList = this.cartService.getCartProduct();
    this.calculate(this.cartProductList);
  }


  calculate(cart: Product[]): void { 
    let sum = 0;
    cart.forEach((item) => {
      sum += Number(item.amount);
    })
    const element = document.getElementById('cartAmount') as HTMLElement;
    element.innerHTML = sum.toString()
  }

}
