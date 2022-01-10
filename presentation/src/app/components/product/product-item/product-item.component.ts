import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FormProductComponent} from "../../../modals/form-product/form-product.component";
import {EditFormProductComponent} from "../../../modals/edit-form-product/edit-form-product.component";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() public product!: Product;

  constructor(
    private readonly productService: ProductService,
    private snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Fermer', {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  deleteProduct() {
    this.productService.delete(this.product.reference);
    this.openSnackBar('Le produit a été supprimé !');
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditFormProductComponent, {
      width: '500px',
      data: this.product
    });
  }
}
