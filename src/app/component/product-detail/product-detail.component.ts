import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
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

  private ngUnsubscribe = new Subject<void>();
  product!: Product;
  products!: Product[];
  quantity: number = 1;
  id!: number;
  productCount: string[] = ['1', '2', '3', '4', '5'];
  selectedItem = '1';

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
    this.productService.getProduct().pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (res: Product[]) => {
        this.products = res;
        this.product = this.getProductDetails(this.id);
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  }
  getProductDetails(id: any): Product {
    return this.products.filter((item) => item.id === id)[0];
  }
  selectedChange(value: any): void{
    this.selectedItem = value;
  }

  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getCartProduct();
    let productInCart = cartProducts.find((element) => element.id === product.id);
    if (productInCart) {
      productInCart.amount = this.selectedItem;
      productInCart ? this.productService.addProduct(cartProducts) : null;
    } else {
      cartProducts.push(Object.assign(product, { amount: this.selectedItem }));
      this.productService.addProduct(cartProducts);
      const message = `${product.name} has been added to cart`;
      alert(message);
    }
    this.router.navigate(['/cart']);
  }
  refresh(): void {
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
