import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from "./components/main-view/main-view.component";
import { CustomerListComponent } from "./components/customer/customer-list/customer-list.component";
import { ProductListComponent } from "./components/product/product-list/product-list.component";
import { StockListComponent } from "./components/stock/stock-list/stock-list.component";
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { ProductPageComponent } from "./components/product/product-page/product-page.component";

const routes: Routes = [
  {path: '', component: MainViewComponent},
  {path: 'dashboard', component: MainViewComponent},
  {path: 'stock', component: StockListComponent},
  {path: 'product', component: ProductListComponent},
  {path: 'product/:reference', component: ProductPageComponent},
  {path: 'order', component: OrderListComponent},
  {path: 'customer', component: CustomerListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
