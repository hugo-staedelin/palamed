import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ProductsFromOrders} from "../models/productsFromOrders";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RefreshService} from "./refresh.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsFromOrdersService {
  subject = new BehaviorSubject<ProductsFromOrders[]>([]);
  private productsFromOrders: ProductsFromOrders[] = [];

  constructor(private readonly httpClient: HttpClient,
              private refreshService: RefreshService) { }

  private emitProductFromOrders(): void {
    this.subject.next(this.productsFromOrders.slice())
  }

  create(productsFromOrders: ProductsFromOrders) {
    return this.httpClient.post<ProductsFromOrders>(environment.apiUrl + '/product-from-orders', productsFromOrders)
      .toPromise().then((res: ProductsFromOrders) => {
          this.productsFromOrders.push(res);
          this.emitProductFromOrders();
          this.refreshService.refresh();
        })
      .catch(error => {
        return error;
      });

  }

  find() {
    return this.httpClient.get<ProductsFromOrders[]>(`${environment.apiUrl}/product-from-orders`);
  }

  findOne(id: number): Observable<ProductsFromOrders> {
    return this.httpClient.get<ProductsFromOrders>(`${environment.apiUrl}/product-from-orders/{id}`);
  }

  update(id: number, productsFromOrders: ProductsFromOrders) {
    this.httpClient.patch<ProductsFromOrders>(`${environment.apiUrl}/product-from-orders/${id}`, productsFromOrders);
    this.refreshService.refresh();
  }

  delete(id: number) {
    this.httpClient.delete<ProductsFromOrders>(`${environment.apiUrl}/product-from-orders/${id}`).subscribe(() => {
    }, error => {
      console.error(error);
    });
    this.refreshService.refresh();
  }
}
