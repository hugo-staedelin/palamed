import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<FormCustomerComponent>,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.customerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  addCustomer() {
    this.customerService.create(this.customerForm.value);
    this.close();
    this.openSnackBar('La commande a été ajoutée.');
  }

  close() {
    this.dialogRef.close();
  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Fermer', {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }
}
