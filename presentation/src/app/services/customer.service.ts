import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Customer} from "../models/customer";
import {HttpClient} from "@angular/common/http";
import {RefreshService} from "./refresh.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  CustomerSubject = new BehaviorSubject<Customer[]>([]);
  private Customers: Customer[] = [];

  constructor(private readonly httpClient: HttpClient,
              private refreshService: RefreshService) { }

   private emitCustomers(): void {
      this.CustomerSubject.next(this.Customers.slice())
    }

  create(Customer: Customer) {
    this.httpClient.post<Customer>(environment.apiUrl + '/customer', Customer)
      .subscribe((res: Customer) => {
          this.Customers.push(res);
          this.emitCustomers();
        },
        error => {
          console.error(error);
        });

    this.refreshService.refresh();
  }

    find(): Observable<Customer[]> {
      return this.httpClient.get<Customer[]>(`${environment.apiUrl}/customer`);
    }

    findOne(id: number): Observable<Customer> {
      return this.httpClient.get<Customer>(`${environment.apiUrl}/customer/{id}`);
    }

    update(id: number, Customer: Customer) {
      this.httpClient.patch<Customer>(`${environment.apiUrl}/customer/${id}`, Customer);
      this.refreshService.refresh();
    }

    delete(id: number) {
      this.httpClient.delete<Customer>(`${environment.apiUrl}/customer/${id}`).subscribe(res => {

      });
      this.refreshService.refresh();
    }
}
