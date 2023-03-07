import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './component/products-list/products-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { CartComponent } from './component/cart/cart.component';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  {
    path:'success/:firstName/:totalPrice',component:ConfirmationComponent
  },
  {path:'**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
