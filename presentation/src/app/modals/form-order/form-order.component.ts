import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ProductsFromOrdersService} from "../../services/products-from-orders.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { DialogComponent } from '../../misc/dialog/dialog.component';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit {
  products: any;
  customerWithOrderForm!: FormGroup;
  order: any;
  customers!: Customer[];

  constructor(
    private formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
    private readonly productFromOrdersService: ProductsFromOrdersService,
    private dialogRef: MatDialogRef<FormOrderComponent>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
    this.initForm();
  }

  initForm() {
    this.customerWithOrderForm = this.formBuilder.group({
      order: this.formBuilder.group({
        customer: ['']
      }),
      product: this.formBuilder.group({
        reference: ['', Validators.required]
      }),
      quantity: ['', Validators.required]
    });
  }

  initFormWithCustomer() {

  }

  getProducts() : void{
    this.productService.find().subscribe(res => {
      this.products = res as Product[];
    }, error => {
      console.error("FORM-ORDER-ERROR: " + error);
    })
  }

  getCustomers() {
    this.customerService.find().subscribe((res: Customer[]) => {
      this.customers = res as Customer[];
    }, error => {
      console.error("FORM-ORDER-ERROR: " + error);
    })
  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Fermer', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  addOrder() {
    this.productFromOrdersService.create(this.customerWithOrderForm.value).then((res) => {
      if (res != null) {
        this.dialog.open(DialogComponent, {
          width: '50%',
          data: {
            value: false,
            message: 'La commande n\'a pas été déclarée (trop de produits commandés ou erreur de saisie)'
          }
        });
      } else {
        this.dialog.open(DialogComponent, {
          width: '50%',
          data: {
            value: true,
            message: 'La commande a été déclarée'
          }
        });
      }
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
