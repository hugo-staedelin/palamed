import {Product} from "./product";
import {Order} from "./order";

export interface ProductsFromOrders {
  productsFromOrderId: number;
  quantity: number;
  product: Product[];
  order: Order[];
}
