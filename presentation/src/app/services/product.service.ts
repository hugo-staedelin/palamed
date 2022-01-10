import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../models/product";
import {Router} from "@angular/router";
import {RefreshService} from "./refresh.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productSubject = new BehaviorSubject<Product[]>([]);
  private products: Product[] = [];

  constructor(
    private readonly httpClient: HttpClient,
    private router: Router,
    private refreshService: RefreshService
  ) {
  }

  private emitProducts(): void {
    this.productSubject.next(this.products.slice())
  }

  create(product: Product) {
    this.httpClient.post<Product>(environment.apiUrl + '/product', product)
      .subscribe((res: Product) => {
        this.products.push(res);
        this.emitProducts();
      });
    this.refreshService.refresh();
  }

  find(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/product`);
  }

  findOne(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.apiUrl}/product/{id}`);
  }

  update(id: number, product: Product) {
    this.httpClient.patch<Product>(environment.apiUrl + '/product/' + id, product)
      .subscribe((res: Product) => {
        this.products[id] = res;
        this.emitProducts();
      });
  }

  delete(id: number) {
    this.httpClient.delete(environment.apiUrl + '/product/' + id).subscribe((res) => {
    }, error => {
      console.error(error);
    });
    this.refreshService.refresh();
  }
}
