import { Component, OnInit } from '@angular/core';
import {StockService} from "../../../services/stock.service";
import {Stock} from "../../../models/stock";
import {FormStockComponent} from "../../../modals/form-stock/form-stock.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  public stocks: Stock[] = [];
  constructor(
      private readonly dialog: MatDialog,
      private readonly stockService: StockService
  ) { }

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks() : void{
      this.stockService.find().subscribe(res => {
        this.stocks = res as Stock[];
      }, error => {
        console.error("STOCK-LIST-ERROR: " + error);
      });
    }

  openDialog() {
    const dialogRef = this.dialog.open(FormStockComponent, {
      width: '500px',
    });
  }
}
