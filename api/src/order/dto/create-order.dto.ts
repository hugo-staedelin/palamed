import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../customer/entities/customer.entity';
import { ProductsFromOrder } from '../../products-from-orders/entities/products-from-order.entity';

export class CreateOrderDto {
  @ApiProperty()
  reference: number;
  @ApiProperty()
  customer: Customer;
  @ApiProperty()
  productsFromOrder: ProductsFromOrder[];
}
