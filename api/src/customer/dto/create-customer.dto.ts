import { Order } from '../../order/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  order?: Order[];
}
