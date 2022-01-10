import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StockService} from "../../services/stock.service";

@Component({
  selector: 'app-form-stock',
  templateUrl: './form-stock.component.html',
  styleUrls: ['./form-stock.component.css']
})
export class FormStockComponent implements OnInit {
  stockForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormStockComponent>,
    private snackBar: MatSnackBar,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.stockForm = this.formBuilder.group({
      capacity: ['', Validators.required],
    })
  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Fermer', {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }


  close() {
    this.dialogRef.close();
  }

  addStock() {
    this.stockService.create(this.stockForm.value);
    this.close();
    this.openSnackBar('Le stock a été créé.');
  }
}
