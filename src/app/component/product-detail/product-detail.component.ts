import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  faStar = faStar;

  product!: Product;
  id!: number;
  products!: Product[];
  selectedItem = '1';
  productCount: string[] = ['1', '2', '3', '4', '5'];
  quantity: number = 1;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
    ) { }
    

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    })
    this.productService
      .getAllProduct()
      .subscribe({
      next: (res: Product[]) => {
        this.products = res;
        this.product = this.getaProductDetails(this.id);
      },
      
    });
  }

  getaProductDetails(id: any): Product {
    let product = this.products.filter((item) => item.id === id)[0];
    return product;
  }
  selectedChange(value: any): void{
    this.selectedItem = value;
  }


  addProductToCart(product: Product): void {
    const productsInCart: Product[] = this.cartService.getCartProduct();
    const productInCartIndex = productsInCart.findIndex(item => item.id === product.id);
    if (productInCartIndex !== -1) {
      productsInCart[productInCartIndex].amount = this.selectedItem;
    } else {
      productsInCart.push({ ...product, amount: this.selectedItem });
      const message = `${product.name} has been added to cart`;
      alert(message);
    }
    this.productService.addProductToCart(productsInCart);
    this.router.navigate(['/cart']);
  }


}
