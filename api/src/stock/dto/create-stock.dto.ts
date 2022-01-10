import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';

export class CreateStockDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  capacity: number;
  @ApiProperty()
  product: Product[];
}
