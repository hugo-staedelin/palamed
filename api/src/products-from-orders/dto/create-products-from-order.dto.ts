import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';

export class CreateProductsFromOrderDto {
  @ApiProperty()
  productsFromOrderId: number;

  @ApiProperty()
  order: Order;

  @ApiProperty()
  product: Product;

  @ApiProperty()
  quantity: number;
}
