import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-form-product',
  templateUrl: './edit-form-product.component.html',
  styleUrls: ['./edit-form-product.component.css']
})
export class EditFormProductComponent implements OnInit {
  productForm!: FormGroup;
  reference!: number;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private dialogRef: MatDialogRef<EditFormProductComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      label: ['', Validators.required],
      type: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Fermer', {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  editProduct() {
    this.productService.update(this.data.reference, this.productForm.value);
    this.close();
    this.openSnackBar('Le produit a été mis à jour !');
  }

  close(){
    this.dialogRef.close();

  }
}
