import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from "@angular/material/dialog";
import { ProductsFromOrders } from "../../../models/productsFromOrders";
import { ProductsFromOrdersService } from "../../../services/products-from-orders.service";
import {FormOrderComponent} from "../../../modals/form-order/form-order.component";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public productFromOrders!: ProductsFromOrders[];

  constructor(
    private readonly dialog: MatDialog,
    private readonly productsFromOrdersService: ProductsFromOrdersService,
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.productsFromOrdersService.find().toPromise().then((data) => {
      this.productFromOrders = data;
    }).catch(error => {
      console.error(error);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormOrderComponent, {
      width: '500px',
    });
  }
}
