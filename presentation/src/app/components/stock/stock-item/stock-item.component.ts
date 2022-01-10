import {Component, Input, OnInit} from '@angular/core';
import {Stock} from "../../../models/stock";
import {Product} from "../../../models/product";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {StockService} from "../../../services/stock.service";

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  @Input() public stock!: Stock;

  product!: Product[];

  constructor(
    private readonly stockService: StockService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.defineProducts();
  }

  defineProducts(){
    this.product = this.stock.product;
  }

  openEditDialog() {

  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Fermer', {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  deleteProduct() {
    this.stockService.delete(this.stock.id);
    this.openSnackBar('Le stock a été supprimé !');
  }
}
