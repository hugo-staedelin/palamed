import {Order} from "./order";

export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  order: Order[];
}
