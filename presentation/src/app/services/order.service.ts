import { Injectable } from '@angular/core';
import {Order} from "../models/order";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {RefreshService} from "./refresh.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderSubject = new BehaviorSubject<Order[]>([]);
  private orders: Order[] = [];

  constructor(private readonly httpClient: HttpClient,
              private refreshService: RefreshService) { }

   private emitOrders(): void {
      this.orderSubject.next(this.orders.slice())
    }

    create(order: Order) {
      this.httpClient.post<Order>(environment.apiUrl + '/order', order)
        .subscribe((res: Order) => {
            this.orders.push(res);
            this.emitOrders();
          },
          error => {
            console.error(error);
          });
      this.refreshService.refresh();
    }

    find(): Observable<Order[]> {
      return this.httpClient.get<Order[]>(`${environment.apiUrl}/order`);
    }

    findOne(id: number): Observable<Order> {
      return this.httpClient.get<Order>(`${environment.apiUrl}/order/${id}`);
    }

    update(id: number, order: Order) {
      this.httpClient.patch<Order>(`${environment.apiUrl}/order/${id}`, order);
      this.refreshService.refresh();
    }

    delete(id: number) {
      this.httpClient.delete<Order>(`${environment.apiUrl}/order/${id}`).subscribe(res => {

      });
      this.refreshService.refresh();
    }
}
