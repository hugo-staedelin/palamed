import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Stock} from "../models/stock";
import {RefreshService} from "./refresh.service";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockSubject = new BehaviorSubject<Stock[]>([]);
  private stocks: Stock[] = [];

  constructor(private readonly httpClient: HttpClient,
              private refreshService: RefreshService) { }

  private emitStocks(): void {
    this.stockSubject.next(this.stocks.slice())
  }

  create(stock: Stock) {
    this.httpClient.post<Stock>(environment.apiUrl + '/stock', stock)
      .subscribe((res: Stock) => {
          this.stocks.push(res);
          this.emitStocks();
        },
        error => {
          console.error(error);
        });
    this.refreshService.refresh();
  }

  find(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${environment.apiUrl}/stock`);
  }

  findOne(id: number): Observable<Stock> {
    return this.httpClient.get<Stock>(`${environment.apiUrl}/stock/{id}`);
  }

  update(id: number, stock: Stock) {
    this.httpClient.patch<Stock>(`${environment.apiUrl}/stock/${id}`, stock);
    this.refreshService.refresh();
  }

  delete(id: number) {
    this.httpClient.delete<Stock>(`${environment.apiUrl}/stock/${id}`).subscribe((res) => {
    }, error => {
      console.error(error);
    });
    this.refreshService.refresh();
  }
}
