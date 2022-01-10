import {ProductsFromOrders} from "./productsFromOrders";
import {Customer} from "./customer";

export interface Order {
  reference: number;
  productsFromOrders: ProductsFromOrders[];
  customer: Customer;
}
