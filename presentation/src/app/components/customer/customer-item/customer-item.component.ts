import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../../models/customer";
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent implements OnInit {

  @Input() customer!: Customer;

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {

  }

  openEditDialog() {

  }

  deleteProduct() {
    this.customerService.delete(this.customer.id);
  }
}
