import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  storage = window.localStorage;
  url = 'http://localhost:4200/assets/data.json';

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]> { 
    return this.http.get<Product[]>(this.url);
  }
  addProductToCart(product: Product[]):void {
    this.storage.setItem('products', JSON.stringify(product));
  }
  getProductsById(id: number): Observable<Product>{
    const uri = `${this.url}/${id}`;
    return this.http.get<Product>(uri)

  }
}
