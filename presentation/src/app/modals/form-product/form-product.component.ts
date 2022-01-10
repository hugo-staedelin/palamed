import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {MatDialogRef} from "@angular/material/dialog";
import {StockService} from "../../services/stock.service";
import {Stock} from "../../models/stock";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  productForm!: FormGroup;
  stocks: any;

  constructor(
    private formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private dialogRef: MatDialogRef<FormProductComponent>,
    private snackBar: MatSnackBar,
    private readonly stockService: StockService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getStock();
  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Fermer', {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      label: ['', Validators.required],
      type: ['', Validators.required],
      quantity: ['', Validators.required],
      stock: ['', Validators.required]
    });
  }

  addProduct() {
    this.productService.create(this.productForm.value);
    this.close();
    this.openSnackBar('Le produit a été créé.');
  }

  getStock() {
    this.stockService.find().subscribe((res) => {
      this.stocks = res as Stock[];
    }, error => {
      console.error(error);
    })
  }

  close(){
    this.dialogRef.close();
  }
}
