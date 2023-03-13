import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  title: string = 'Product List';
  products: Product[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService
      .getAllProduct()
      .subscribe({
        next: (data: Product[]) => {
          this.products = data
        },
      });
  }
}
