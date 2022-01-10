import {Product} from "./product";

export interface Stock {
  id: number;
  capacity: number;
  product: Product[]
}
