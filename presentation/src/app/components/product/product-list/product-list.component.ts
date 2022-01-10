import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {FormProductComponent} from "../../../modals/form-product/form-product.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() : void{
    this.productService.find().subscribe(res => {
      this.products = res as Product[];
    }, error => {
      console.error("PRODUCT-VIEW-ERROR: " + error);
    })
  }

  openDialog() {
    this.getProducts();
    const dialogRef = this.dialog.open(FormProductComponent, {
      width: '500px',
    });
  }
}
