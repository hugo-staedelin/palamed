import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainViewComponent } from './components/main-view/main-view.component';
import { StockViewComponent } from './components/stock/stock-view/stock-view.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { OrderViewComponent } from './components/order/order-view/order-view.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormProductComponent } from './modals/form-product/form-product.component';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { StockItemComponent } from './components/stock/stock-item/stock-item.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderItemComponent } from './components/order/order-item/order-item.component';
import { MatTableModule } from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { EditFormProductComponent } from './modals/edit-form-product/edit-form-product.component';
import { ProductPageComponent } from './components/product/product-page/product-page.component';
import { FormOrderComponent } from './modals/form-order/form-order.component';
import { CustomerItemComponent } from './components/customer/customer-item/customer-item.component';
import { FormStockComponent } from './modals/form-stock/form-stock.component';
import { FormCustomerComponent } from './modals/form-customer/form-customer.component';
import {RefreshService} from "./services/refresh.service";
import { DialogComponent } from './misc/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    StockViewComponent,
    ProductViewComponent,
    OrderViewComponent,
    CustomerListComponent,
    FormProductComponent,
    ProductItemComponent,
    ProductListComponent,
    StockListComponent,
    StockItemComponent,
    OrderListComponent,
    OrderItemComponent,
    EditFormProductComponent,
    ProductPageComponent,
    FormOrderComponent,
    CustomerItemComponent,
    FormStockComponent,
    FormCustomerComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [RefreshService],
  bootstrap: [AppComponent]
})
export class AppModule { }
