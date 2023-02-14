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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }

  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> { 
    return this.http.get<Product[]>(this.url);
  }
  addProduct(product: Product[]):void {
    this.storage.setItem('products', JSON.stringify(product));
  }
  getProductsById(id: number): Observable<Product>{
    const uri = `${this.url}/${id}`;
    return this.http.get<Product>(uri).pipe(catchError(this.handleError<Product>(`getProduct id=${id}`)));
  }
}
