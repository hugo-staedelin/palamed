import {Stock} from "./stock";

export interface Product {
  reference: number;
  label: string;
  type: string;
  quantity: number;
  stock: Stock;
}
