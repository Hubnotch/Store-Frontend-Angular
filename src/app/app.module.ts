import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProductsListComponent } from './component/products-list/products-list.component';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsListComponent,
    ProductComponent,
    CartComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
